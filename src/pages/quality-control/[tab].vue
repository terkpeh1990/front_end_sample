<script setup>
import Search from '@/pages/components/Search.vue';
import { useInventoryStore, useRestockStore, useRawMaterialsStore, useProductionStore } from '@/stores';
import Production from '@/views/quality-control/Production.vue';
import RawMaterials from '@/views/quality-control/RawMaterials.vue'
import FinishedGoods from '@/views/quality-control/FinishedGoods.vue'
import Damages from '@/views/quality-control/Damages.vue'
import { requestMaterials } from '@/views/raw-materials-setup/store';


const route = useRoute()
const activeTab = ref(route.params.tab)
const isAddStockDrawerVisible = ref(false)

const restockStore = useRestockStore()
const { fetchInventorySummary } = useInventoryStore();
const { fetchRawMaterials } = useRawMaterialsStore();
const { fetchProductions } = useProductionStore()

const inventoryLoading = ref(false)
const stockLoading = ref(false)
const inventoryData = ref([])
const inventoryMetaData = ref({})
const stockData = ref([])
const stockMetaData = ref({})

const productionMetaData = ref({})
const productionData = ref([])
const productionLoading = ref(false)

const fetchProduction = async (page = 1, search = '') => {
  productionLoading.value = true

  const res = await fetchProductions(page, search)
  const { data, ...rest } = res

  let _data = []

  data.forEach((p, i) => {
    p.products.forEach(x => {
      x['shift'] = p.shift;
      x['status'] = p.status;
      x.id = `${p.id}/${x.id}`
    })
    _data = [..._data, ...p.products]
  })

  productionData.value = _data
  productionMetaData.value = rest
  productionLoading.value = false
}

const fetchStock = async (page = 1, search = '') => {
  stockLoading.value = true

  const response = await restockStore.fetchAllStock(page, search)

  const { data, ...rest } = response

  stockData.value = data
  stockMetaData.value = rest
  stockLoading.value = false

}


watchEffect(() => fetchStock())
watchEffect(() => fetchProduction())


const editStockData = ref({})

const materialTitle = ref('')


const getStock = data => {
  materialTitle.value = 'Edit Material'
  editStockData.value = data
  isAddStockDrawerVisible.value = true;
}

// tabs
const tabs = [
  {
    title: 'Raw Materials',
    icon: 'tabler-users',
    tab: 'stock',
    count: 0,
    action: () => 0,
  },
  {
    title: 'Production Unit',
    icon: 'tabler-lock',
    tab: 'requests',
    count: requestMaterials.length,
    action: () => 0,
  },
  {
    title: 'Finished Goods',
    icon: 'tabler-lock',
    tab: 'finished-goods',
    count: 0,
    action: () => 0,
  },
  {
    title: 'Damages',
    icon: 'tabler-lock',
    tab: 'damages',
    count: 0,
    action: () => 0,
  },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      class="mb-5"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'quality-control-tab', params: { tab: item.tab } }"
        @click.prevent="item?.action"
      >
        {{ item.title }}
        <VBadge
          v-if="item.count"
          class="mx-5 my-auto"
          color="error"
          :content="productionData.filter(x => x.status == 'Pending').length"
        />
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <VWindowItem value="stock">
        <VCard class="py-5 px-4">
          <RawMaterials
            :data="stockData"
            :loading="stockLoading"
            :meta-data="stockMetaData"
            @edit-stock="getStock"
            @page-change="(page) => fetchStock(page)"
          />
        </VCard>
      </VWindowItem>

      <VWindowItem value="requests">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between btn_space h-100">
            <VSpacer />
          </div>
          <Production
            :data="productionData"
            :meta-data="productionMetaData"
            :loading="productionLoading"
          />
        </VCard>
      </VWindowItem>
      <VWindowItem value="finished-goods">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between btn_space h-100">
            <VSpacer />
          </div>
          <FinishedGoods
            :data="[]"
            :loading="false"
          />
        </VCard>
      </VWindowItem>
      <VWindowItem value="damages">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between btn_space h-100">
            <VSpacer />
          </div>
          <Damages
            :data="[]"
            :loading="false"
          />
        </VCard>
      </VWindowItem>
    </VWindow>
  </div>
</template>

<style>
.btn_space {
  padding-block-start: 3.5em;
}
</style>

<route lang="yaml">
meta:
  navActiveLink: quality-control-tab
</route>
