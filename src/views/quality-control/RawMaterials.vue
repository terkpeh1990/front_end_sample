<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => {} },
})

const emit = defineEmits(['editStock', 'pageChange'])


const fetchPageData = page => {
  emit('pageChange', page)
}

const isLoading = computed(() => props.loading)
const data = computed(() => props.data);

const header = [
  {
    id: 2,
    name: 'Id',
    key: 'id',
  },
  {
    id: 4,
    name: 'Materials',
    key: 'materials',
  },
  {
    id: 1,
    name: 'Purpose',
    key: 'purpose',
  },
  {
    id: 2,
    name: 'Date',
    key: 'date',
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
  if (status === 'cancelled')
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
  <Table
    :table-header="header"
    :table-data="data"
    :is-loading="isLoading"
    :meta-data="props.metaData"
    :route="{ name: 'materials-preview-id' }"
    @page="fetchPageData"
  >
    <template #cell-id="{ row: products }">
      {{ products.restock_info.supplier.name }}
      <VChip
        label
        class="mx-3"
        :color="resolveDataStatusVariant(products.status).variant"
      >
        {{ products.status }}
      </VChip>
    </template>
    <template #cell-materials="{ row: products }">
      {{ products.consignment_details[0].name }} <span v-if="products.consignment_details.length - 1 > 0"> & {{ products.consignment_details.length - 1 }} other<span v-if="products.consignment_details.length - 1 > 1">s</span></span>
    </template>
    <template #cell-purpose="{ row: products }">
      N/A
    </template>
    <template #cell-date="{ row: products }">
      {{ formatDate(products.created_at) }}
    </template>
  </Table>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>
