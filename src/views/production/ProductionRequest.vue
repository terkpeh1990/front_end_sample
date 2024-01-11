<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => { } },
  isGridView: { type: Boolean, default: () => true },
})

const emit = defineEmits([
  'production',
])


const triggerRequestMaterialDrawer = () => {
  emit('production')
}

const tableData = computed(() => props.data)

const completedTableHeaders = [
  {
    id: 4,
    name: 'Product',
    key: 'product',
  },
  {
    id: 4,
    name: 'Lot No.',
    key: 'lot',
  },
  {
    id: 8,
    name: 'Yield',
    key: 'yield',
  },
  {
    id: 10,
    name: 'Shift',
    key: 'shift',
  },
  {
    id: 3,
    name: 'Expiry Date',
    key: 'date',
  },
]

const tableHeaders = [
  {
    id: 4,
    name: 'Product',
    key: 'product',
  },
  {
    id: 8,
    name: 'Expected Yield',
    key: 'yield',
  },
  {
    id: 10,
    name: 'Status',
    key: 'shift',
  },
  {
    id: 3,
    name: 'Date',
    key: 'date',
  },
]


const productionActiveTab = ref(0)

const productionTabs = [
  {
    title: 'Ongoing',
    count: '2',
    tab: '0',
  },
  {
    title: 'Completed',
    count: '',
    tab: '1',
  },
]

const resolveDataStatusVariant = status => {
  status = status.toLowerCase()
  if (status === 'approved')
    return {
      variant: 'success',
      icon: 'tabler-circle-half-2',
    }
  if (status === 'pending')
    return {
      variant: 'warning',
      icon: 'tabler-chart-pie',
    }
  if (status === 'Past Due')
    return {
      variant: 'error',
      icon: 'tabler-info-circle',
    }

  return {
    variant: 'secondary',
    icon: 'tabler-x',
  }
}
</script>

<template>
  <VCard>
    <VCardText>
      <div class="action">
        <div class="d-flex flex justify-space-between mb-5">
          <VTabs v-model="productionActiveTab">
            <VTab
              v-for="item in productionTabs"
              :key="item.icon"
              :value="item.tab"
              :to="{ name: 'production-tab', params: { tab: item.tab } }"
            >
              {{ item.title }}
              <VBadge
                v-if="item.count"
                class="mx-5 my-auto"
                color="error"
                :content="item.count"
              />
            </VTab>
          </VTabs>
          <VSpacer />
          <div class="action_btn">
            <VBtn
              prepend-icon="tabler-plus"
              variant="tonal"
              @click="triggerRequestMaterialDrawer"
            >
              New Production
            </VBtn>
          </div>
        </div>
      </div>
      <div v-if="productionActiveTab == 0">
        <Table
          :table-header="tableHeaders"
          :table-data="tableData"
          :is-loading="props.loading"
          :meta-data="props.metaData"
          :route="{ name: 'production-request-id' }"
        >
          <template #cell-date="{ row: products }">
            {{ formatDate(products.created_at) }}
          </template>
          <template #cell-product="{ row: products }">
            {{ products.product_id.product_name }}
          </template>
          <template #cell-yield="{ row: products }">
            {{ products.expected_yeild?.toLocaleString('en-US') }} {{ products.product_id.pakaged_unit }}
          </template>
          <template #cell-shift="{ row: products }">
            <VChip
              label
              :color="resolveDataStatusVariant(products.status).variant"
            >
              {{ products.status }}
            </VChip>
          </template>
        </Table>
      </div>
      <div v-else>
        <Table
          :table-header="completedTableHeaders"
          :table-data="[]"
          :is-loading="props.loading"
          :meta-data="props.metaData"
          :route="{ name: 'production-request-id' }"
        >
          <template #cell-date="{ row: products }">
            {{ formatDate(products.created_at) }}
          </template>
          <template #cell-product="{ row: products }">
            {{ products.product_id.product_name }}
          </template>
          <template #cell-yield="{ row: products }">
            {{ products.expected_yeild?.toLocaleString('en-US') }}
          </template>
          <template #cell-lot="{ row: products }">
            {{ !products.lot_number ? 'N/A' : products.lot_number }}
          </template>
          <template #cell-shift="{ row: products }">
            {{ products.shift.name }}
          </template>
        </Table>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.product-card {
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
}
</style>
