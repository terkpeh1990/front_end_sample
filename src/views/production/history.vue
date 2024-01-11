<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => { } },
})

const tableData = computed(() => props.data)

const tableHeaders = [
  {
    id: 4,
    name: 'Product',
    key: 'product',
  },
  {
    id: 1,
    name: 'Lot Number',
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
    name: 'Date',
    key: 'date',
  },
]
</script>

<template>
  <Table
    :table-header="tableHeaders"
    :table-data="tableData"
    :is-loading="props.loading"
    :meta-data="props.metaData"
    :route="{ name: 'production-request-id' }"
  >
    <template #cell-date="{ row: products }">
      {{ formatDate(products.production_date ) }}
    </template>
    <template #cell-product="{ row: products }">
      {{ products.products[0].product_id.product_name }} <span v-if="products.products.length - 1 > 0"> and {{ products.products.length - 1 }} other<span v-if="products.products.length - 1 > 1">s</span></span>
    </template>
    <template #cell-yield="{ row: products }">
      N/A
    </template>
    <template #cell-lot="{ row: products }">
      N/A
    </template>
    <template #cell-shift="{ row: products }">
      {{ products.shift.name }}
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
