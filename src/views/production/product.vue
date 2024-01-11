<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => { } },
})

const emit = defineEmits([, 'pageChange', 'editProduct', 'delete'])

const fetchPageData = page => {
  emit('pageChange', page)
}

const isConfirmDialogOpen = ref(false)

const openConfirmDialog = async id => {
  entityId.value = id
  isConfirmDialogOpen.value = true
}

const tableData = computed(() => props.data)

const tableHeaders = [
  {
    id: 3,
    name: 'Name',
    key: 'name',
  },
  {
    id: 4,
    name: 'Available Qty',
    key: 'available',
  },
  {
    id: 8,
    name: 'Last Produce',
    key: 'produce',
  },
  {
    id: 9,
    name: 'Changes',
    key: 'changes',
  },
  {
    id: 9,
    name: 'Actions',
    key: 'action',
  },
]
</script>

<template>
  <Table
    :table-header="tableHeaders"
    :table-data="tableData"
    :is-loading="props.loading"
    :meta-data="props.metaData"
    @page="fetchPageData"
  >
    <template #cell-name="{ row: products }">
      {{ products.brand_id.brand_name }} {{ products.product_name }}
    </template>
    <template #cell-available="{ row: products }">
     N/A
    </template>
    <template #cell-produce="{ row: products }">
      N/A
    </template>
    <template #cell-changes="{ row: products }">
      N/A
    </template>
    <template #cell-action="{ row: item }">
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
            <VListItem @click="$emit('editProduct', { data: item } )">
              <template #prepend>
                <VIcon
                  size="24"
                  class="me-3"
                  icon="tabler-pencil"
                />
              </template>
  
              <VListItemTitle>Modify</VListItemTitle>
            </VListItem>
            <VListItem @click="openConfirmDialog(item.id)">
              <template #prepend>
                <VIcon
                  size="24"
                  class="me-3"
                  icon="tabler-trash"
                />
              </template>
  
              <VListItemTitle>Delete</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </VBtn>
    </template>
  </Table>
  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogOpen"
    confirmation-msg="Are you sure you want to delete this item?"
    @confirm="(isConfirmed) => {
      if (isConfirmed) {
        deleteEtity(entityId)
      }
    }"
  />
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
