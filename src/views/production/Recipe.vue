<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  data: { type: Array, required: true },
  loading: { type: Boolean, default: () => false },
  metaData: { type: Object, default: () => { } },
})


const emit = defineEmits([
  'editRecipe',
])

const tableData = computed(() => props.data)

const tableHeaders = [
  {
    id: 3,
    name: 'Recipe Name',
    key: 'name',
  },
  {
    id: 4,
    name: 'Ingredients',
    key: 'ingredients',
  },
  {
    id: 4,
    name: 'Action',
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
  >
    <template #cell-name="{ row: products }">
      {{ products.name }}
    </template>
    <template #cell-ingredients="{ row: products }">
      {{ products.ingrediants[0].ingrediant.name }} <span v-if="products.ingrediants.length - 1 > 0"> & {{ products.ingrediants.length - 1 }} other<span v-if="products.ingrediants.length - 1 > 1">s</span></span>
    </template>
    <template #cell-action="{ row: products }">
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
            <VListItem @click="$emit('editRecipe', { data: products} )">
              <template #prepend>
                <VIcon
                  size="24"
                  class="me-3"
                  icon="tabler-pencil"
                />
              </template>
  
              <VListItemTitle>Modify</VListItemTitle>
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
