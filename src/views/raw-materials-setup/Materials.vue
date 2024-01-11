<script setup>
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, deafault: () => false },
  metaData: { type: Object, default: () => { } },
})

const emit = defineEmits(["editMaterial"])

const tableData = computed(() => props.data)

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

const tableHeaders = [
  {
    id: 1,
    name: 'Name',
    key: 'name',
  },
  {
    id: 2,
    name: 'Category',
    key: 'category',
  },
  {
    id: 3,
    name: 'Brand',
    key: 'brand',
  },
  {
    id: 3,
    name: 'Restock Level',
    key: 'measurement',
  },
  {
    id: 4,
    name: 'Actions',
    key: 'actions',
  },
]
</script>

<template>
  <Table
    :table-header="tableHeaders"
    :table-data="tableData"
    :is-loading="props.loading"
    :meta-data="props.metaData"
  >
    <template #cell-name="{ row: products }">
      {{ products.name }}
    </template>
    <template #cell-category="{ row: products }">
      {{ products.category ?? 'N/A' }}
    </template>
    <template #cell-brand="{ row: products }">
      {{ products.brand ?? 'N/A' }}
    </template>
    <template #cell-measurement="{ row: products }">
      {{ products.restock_level }} {{ products.measurement_unit }}
    </template>
    <template #cell-actions="{ row: products }">
      <VBtn
        icon
        variant="text"
        color="default"
        size="x-small"
      >
        <VIcon
          :size="22"
          icon="tabler-dots-vertical"
        />

        <VMenu activator="parent">
          <VList>
            <VListItem>
              <template #prepend>
                <VIcon
                  size="24"
                  class="me-3"
                  icon="tabler-pencil"
                />
              </template>

              <VListItemTitle>Modify {{ products.name }}</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </VBtn>
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
