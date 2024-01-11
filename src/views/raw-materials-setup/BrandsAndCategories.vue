<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '../../pages/components/table.vue';
import { useBrandStore, useCategoryStore } from '@/stores';


const props = defineProps({
  toasterData: { type: Object, default: () => {} },
  tableData: { type: Array, required: true },
  tableHeaders: { type: Array, required: true },
  type: { type: String, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => {} },
});

const emit = defineEmits(['editBrandsOrCategory', 'delete'])
const message = inject('showToaster')

const brandStore = useBrandStore()
const isConfirmDialogOpen = ref(false)
const categoryStore = useCategoryStore()
const isLoading = computed(() => props.loading)
const header = ref(props.tableHeaders);
const data = computed(() => props.tableData);
const _type = ref(props.type);
const entityId = ref('');

const deleteEtity = async (id, type) => {

  if (type === 'category') {
    
    const res = await categoryStore.deleteCategory(id)
    if (res.status === 204) {
      message('Successfully deleted category', 'success')
    } else {
      message('Failed to delete category', 'error')
    }
  } else {
    const res = await brandStore.deleteBrand(id)
    if (res.status === 204) {
      if (res.status === 204) {
        message('Successfully deleted brand', 'success')
      } else {
        message('Failed to delete brand', 'error')
      }
    }
  }
  emit('delete', type)
}

const openConfirmDialog = async id => {
  entityId.value = id
  isConfirmDialogOpen.value = true
}
</script>

<template>
  <Table
    :table-header="header"
    :table-data="data"
    :is-loading="isLoading"
    :meta-data="props.metaData"
  >
    <template #cell-name="{ row: item }">
      {{ item?.name ?? item?.brand_name }}
    </template>
    <template #cell-stock="{ row: item }">
      {{ item.stock ?? 'N/A' }}
    </template>
    <template #cell-date="{ row: item }">
      {{ formatDate(item.created_at) ?? 'N/A' }}
    </template>
    <template #cell-actions="{ row: item }">
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
            <VListItem @click="$emit('editBrandsOrCategory', { data: item, type: _type } )">
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
        deleteEtity(entityId, _type)
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
