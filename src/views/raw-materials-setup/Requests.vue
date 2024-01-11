<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  isLoading: { type: Boolean, default: () => false },
})

// const tableData = ref([
//   {
//     id: 1,
//     date: new Date(),
//     name: 'Kalypo Apple 20g',
//     status: 'Waiting for Supply',
//   },
// ])

const tableData = computed(() => props.data.filter(x => x.status.toLowerCase().includes('waiting for supply')))

const tableHeaders = [
  {
    id: 8,
    name: 'Request Date',
    key: 'date',
  },
  {
    id: 4,
    name: 'To Produce',
    key: 'name',
  },
  {
    id: 8,
    name: 'Status',
    key: 'status',
  },
]


const resolveDataStatusVariant = status => {
  status = status.toLowerCase()
  if (status === 'approved')
    return {
      variant: 'success',
      icon: 'tabler-circle-half-2',
    }
  if (status === 'new')
    return {
      variant: 'warning',
      icon: 'tabler-chart-pie',
    }
  if (status === 'pending')
    return {
      variant: 'info',
      icon: 'tabler-arrow-down-circle',
    }
  if (status === 'Draft')
    return {
      variant: 'primary',
      icon: 'tabler-device-floppy',
    }
  if (status === 'Sent')
    return {
      variant: 'secondary',
      icon: 'tabler-circle-check',
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

const statuses = [
  {
    id: 1,
    name: 'Supply',
    icon: 'tabler-circle-check',
  },
  {
    id: 2,
    name: 'Reject',
    icon: 'tabler-x',
  },
  {
    id: 2,
    name: 'Finish Production',
    icon: 'tabler-check',
  },
]
</script>

<template>
  <Table
    :table-header="tableHeaders"
    :table-data="tableData"
    :is-loading="props.isLoading"
    :route="{ name: 'materials-requests-id' }"
  >
    <template #cell-date="{ row: products }">
      {{ formatDate(products.product_id.created_at) }}
    </template>
    <template #cell-name="{ row: products }">
      {{ products.product_id.product_name }}
    </template>
    <template #cell-status="{ row: products }">
      <VChip
        label
        color="warning"
      >
        {{ products.status }}
      </VChip>
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
