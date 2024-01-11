<script setup>
import Loader from './Loader.vue';
import { useRouter } from "vue-router";

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  tableHeader: {
    type: Array,
    required: true,
  },
  isLoading: { type: Boolean, default: () => true },
  export: {
    type: Boolean,
    default: false,
  },
  rowCount: { type: Boolean, default: true },
  metaData: { type: Object, default: () => {} },
  route: { type: Object, default: () => {} },
  handleClick: { type: Boolean, default: false },
  clickAction: { type: Function, default: () => {} },
})

const emits = defineEmits(['paginationData', 'page'])

const router = useRouter()

const data = computed(() => props.tableData)
const headers = ref(props.tableHeader)
const shouldExport = ref(props.export)
const loading = computed(() => props.isLoading)
const metaData = computed(() => props.metaData ?? { page_size: 0, page: 1, total_items: 0, total_pages: 0 })

const retrievePage = e => {
  emits('page', e)
}

// 👉 Computing pagination data
const paginationData = computed(() => {  
  return `Showing ${ (metaData.value?.page - 1) * metaData.value?.page_size + 1 } to 
  ${ data?.value.length >= metaData.value.page_size ? metaData.value.page_size * metaData.value?.page : metaData.value?.total_items } of 
  ${ metaData.value?.total_items } entries`
});

function handleRowClick(id) {
  props.route ? router.push({ ...props.route, params: { id: id } }) : '';
  props.handleClick ? props.clickAction(id) : null;
}
</script>

<template>
  <VCard
    v-if="data"
    id="table-list"
    class="shadow-none"
  >
    <template
      v-if="shouldExport"
      #append
    >
      <VBtn
        color="default"
        variant="tonal"
        prepend-icon="tabler-screen-share"
        append-icon="tabler-chevron-down"
      >
        Export
        <VMenu activator="parent">
          <VList density="compact">
            <VListItem
              v-for="(item, index) in ['PDF', 'XLSX', 'CSV']"
              :key="index"
              :value="index"
            >
              <VListItemTitle>{{ item }}</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </VBtn>
    </template>

    <VDivider />

    <!-- SECTION Table -->
    <VTable
      hover
      fixed-footer
      class="text-no-wrap table-list-table"
    >
      <thead>
        <tr>
          <th
            v-if="props.rowCount"
            scope="col"
            class="text-uppercase"
          >
            #
          </th>
          <th
            v-for="header in headers"
            :key="header.id"
            scope="col"
            class="text-uppercase"
          >
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <template v-if="!loading">
        <tbody>
          <template
            v-for="(item, i) in tableData"
            :key="i"
          >
            <tr
              style="height: 3.75rem; cursor: pointer;"
              @click.prevent="() => handleRowClick(item.id)"
            >
              <td v-if="props.rowCount">
                {{ i + 1 }}
              </td>
              <template
                v-for="(cell, j) in tableHeader"
                :key="j"
              >
                <td>
                  <slot
                    :name="`cell-${cell.key}`"
                    :row="item"
                  >
                    {{ item[prop] }}
                  </slot>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </template>
      <tfoot
        v-else
        class="my-12"
      >
        <tr>
          <td
            colspan="7"
            class="text-center text-body-1 mt-5"
          >
            <div class="empty_state mt-5">
              <Loader />
            </div>
          </td>
        </tr>
      </tfoot>
      <tfoot v-show="!loading && data.length < 1">
        <tr>
          <td
            colspan="7"
            class="text-center text-body-1 mt-5"
          >
            <div class="empty_state mt-5">
              <img
                src="@images/empy_state.svg"
                alt=""
              >
              <p class="mt-0">
                No data found
              </p>
            </div>
          </td>
        </tr>
      </tfoot>
    </VTable>

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText
      v-if="props.metaData"
      class="d-flex align-center flex-wrap justify-space-between gap-4 py-3"
    >
      <!-- 👉 Pagination meta -->
      <span
        class="text-sm text-disabled"
      >{{ paginationData }}</span>

      <!-- 👉 Pagination -->
      <VPagination
        v-model="metaData.page"
        size="small"
        :total-visible="metaData.page_size"
        :length="metaData.total_pages"
        @next="retrievePage"
        @update:model-value="retrievePage"
      />
    </VCardText>
  <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss">
#table-list {
  .table-list-status {
    inline-size: 15rem;
  }

  .table-list-search {
    inline-size: 12rem;
  }
}
</style>
