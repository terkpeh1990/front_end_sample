<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => {} },
})

const emit = defineEmits(['editStock'])

const isLoading = computed(() => props.loading)



const data = computed(() => props.data);

const header = [
  {
    id: 2,
    name: 'Request Id',
    key: 'id',
  },
  {
    id: 4,
    name: 'Product',
    key: 'materials',
  },
  {
    id: 2,
    name: 'Date',
    key: 'date',
  },
  {
    id: 1,
    name: 'Status',
    key: 'status',
  },
]

const resolveDataStatusVariant = status => {
  status = status.toLowerCase()
  if (status.includes('completed'))
    return {
      variant: 'success',
      icon: 'tabler-circle-half-2',
    }
  if (status.includes('pending'))
    return {
      variant: 'warning',
      icon: 'tabler-chart-pie',
    }
  if (status.includes('qa'))
    return {
      variant: 'info',
      icon: 'tabler-info-circle',
    }
  if (status.includes('production'))
    return {
      variant: 'info',
      icon: 'tabler-info-circle',
    }
  if (status.includes('approved'))
    return {
      variant: 'success',
      icon: 'tabler-info-circle',
    }
  if (status.includes('cancelled'))
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
    :route="{ name: 'quality-control-requests-id' }"
  >
    <template #cell-id="{ row: products }">
      #{{ products.id.substring(0, 6) }}
      <VChip
        label
        class="mx-3"
        :color="resolveDataStatusVariant(products.status).variant"
      >
        {{ products.status }}
      </VChip>
    </template>
    <template #cell-materials="{ row: products }">
      {{ products.product_id.product_name }}
    </template>
    <template #cell-status="{ row: products }">
      <VChip
        label
        class="mx-3"
        :color="resolveDataStatusVariant(products.status).variant"
      >
        {{ products.status }}
      </VChip>
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
