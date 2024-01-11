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
    name: 'Date',
    key: 'date',
  },
  {
    id: 4,
    name: 'Waybill Number',
    key: 'waybillNumber',
  },
  {
    id: 1,
    name: 'Supplier',
    key: 'supplier',
  },
  {
    id: 8,
    name: 'Driver Info',
    key: 'driver',
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
    <template #cell-supplier="{ row: products }">
      {{ products.restock_info.supplier.name }}
    </template>
    <template #cell-waybillNumber="{ row: products }">
      {{ products.restock_info.waybillNumber }}
      <VChip
        label
        class="mx-3"
        :color="resolveDataStatusVariant(products.status).variant"
      >
        {{ products.status }}
      </VChip>
    </template>
    <template #cell-driver="{ row: products }">
      <div class="d-flex flex-column">        
        <h6 class="text-base font-weight-medium mb-0">
          {{ products.restock_info.driverName }}
        </h6>
        <span class="text-disabled text-sm">
          <VIcon
            color="primary"
            size="16"
            icon="tabler-phone"
          /> 
          {{ products.restock_info.phoneNumber }}
        </span>
      </div>
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
