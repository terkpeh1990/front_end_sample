<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => { } },
})

const emit = defineEmits([, 'pageChange'])


const fetchPageData = page => {
  emit('pageChange', page)
}

const tableData = computed(() => props.data)

const tableHeaders = [
  {
    id: 3,
    name: 'Raw Material',
    key: 'name',
  },
  {
    id: 4,
    name: 'Available Quantity',
    key: 'changeFrom',
  },
  {
    id: 8,
    name: 'Status',
    key: 'status',
  },
  {
    id: 8,
    name: 'Category',
    key: 'createdBy',
  },
]
</script>

<template>
  <Table
    :table-header="tableHeaders"
    :table-data="tableData"
    :is-loading="props.loading"
    :meta-data="props.metaData"
    :route="{ name: 'materials-inventory-id' }"
    @page="fetchPageData"
  >
    <template #cell-name="{ row: products }">
      {{ products.material_id?.brand_id?.brand_name }} {{ products.material_id.name }}
    </template>
    <template #cell-changeFrom="{ row: products }">
      {{ products.avialable_quantity.toLocaleString('en-US') }} {{ products.material_id.measurement_unit }}
    </template>
    <template #cell-batchNumber="{ row: products }">
      {{ products.batchNumber }}
    </template>
    <template #cell-status="{ row: products }">
      <VChip
        label
        :color="products.avialable_quantity < products.material_id.restock_level ? 'error' : 'success'"
      >
        {{ products.avialable_quantity < products.material_id.restock_level ? 'Low Stock' : 'In Stock' }}
      </VChip>
    </template>
    <template #cell-createdBy="{ row: products }">
      {{ products.material_id.category_id.name }}
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
