<!-- eslint-disable import/no-unresolved -->
<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';


const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => {} },
});

const emit = defineEmits(['editSupplier', 'delete'])
const message = inject('showToaster')

const isConfirmDialogOpen = ref(false)
const isLoading = computed(() => props.loading)

const header = ref([
  {
    id: 1,
    name: 'Name',
    key: 'name',
  },
  {
    id: 2,
    name: 'Address',
    key: 'address',
  },
  {
    id: 3,
    name: 'Action',
    key: 'action',
  },
]);

const data = computed(() => props.data);
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
    <template #cell-address="{ row: item }">
      <div class="d-flex flex-column">        
        <h6 class="text-base font-weight-medium mb-0">
          {{ item.address.city ?? 'N/A' }}
        </h6>
        <span class="text-disabled text-sm">{{ item.address.street ?? 'N/A' }}</span>
      </div>
    </template>
    <template #cell-date="{ row: item }">
      {{ formatDate(item.created_at) ?? 'N/A' }}
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
            <VListItem @click="$emit('editSupplier', { data: item } )">
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
