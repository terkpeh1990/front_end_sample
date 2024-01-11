<script setup>
import Search from '@/pages/components/Search.vue';
import { useBrandStore, useCategoryStore, useInventoryStore, useRestockStore, useSupplierStore, useRawMaterialsStore, useProductionStore } from '@/stores';
import BrandsAndCategories from '@/views/raw-materials-setup/BrandsAndCategories.vue';
import Dashboard from '@/views/raw-materials-setup/Dashboard.vue';
import Inventory from '@/views/raw-materials-setup/Inventory.vue';
import RawMaterials from '@/views/raw-materials-setup/RawMaterials.vue';
import Requests from '@/views/raw-materials-setup/Requests.vue';
import Suppliers from '@/views/raw-materials-setup/Suppliers.vue';
import InventoryFilterDrawer from '@/views/raw-materials-setup/drawers/InventoryFilterDrawer.vue';
import AddNewBrandDrawer from '@/views/raw-materials-setup/drawers/AddNewBrandDrawer.vue';
import AddNewCategoryDrawer from '@/views/raw-materials-setup/drawers/AddNewCategoryDrawer.vue';
import AddNewMaterialDrawer from '@/views/raw-materials-setup/drawers/AddNewMaterialDrawer.vue';
import AddNewSupplierDrawer from '@/views/raw-materials-setup/drawers/AddNewSupplierDrawer.vue';
import AddStockDrawer from '@/views/raw-materials-setup/drawers/AddStockDrawer.vue';
import CreateForm from '@/views/raw-materials-setup/settings/CreateForm.vue';
import { brandHeaders, formData } from '@/views/raw-materials-setup/store';


const route = useRoute()
const activeTab = ref(route.params.tab)
const isAddNewMaterialDrawerVisible = ref(false)
const isAddStockDrawerVisible = ref(false)
const isAddNewBrandDrawerVisible = ref(false)
const isAddNewCategoryDrawerVisible = ref(false)
const isAddNewSupplierDrawerVisible = ref(false)

const brandStore = useBrandStore()
const categoryStore = useCategoryStore()
const supplierStore = useSupplierStore()
const restockStore = useRestockStore()
const { fetchInventorySummary } = useInventoryStore();
const { fetchRawMaterials } = useRawMaterialsStore();
const { fetchProductions } = useProductionStore()


const brandLoading = ref(false)
const categoryLoading = ref(false)
const supplierLoading = ref(false)
const inventoryLoading = ref(false)
const inventoryPackagingLoading = ref(false)
const materialsLoading = ref(false)
const isSortFilterOpen = ref(false)
const stockLoading = ref(false)
const brandData = ref([])
const inventoryData = ref([])
const inventoryPackagingData = ref([])
const supplierData = ref([])
const supplierMetaData = ref({})
const materialsMetaData = ref({})
const inventoryMetaData = ref({})
const inventoryPackagingMetaData = ref({})
const stockData = ref([])
const requestMaterials = ref([])
const stockMetaData = ref({})
const brandMetaData = ref({})
const categoryMetaData = ref({})
const materialsData = ref({})
const toasterData = ref({})

const categoryData = ref([])

const fetchSummary = async params => {
  inventoryLoading.value = true

  const response = await fetchInventorySummary(localStorage.getItem("baseUrl"), { ...params, category_id__name: 'Ingredient' })

  const { data: { data, ...rest } } = response

  inventoryData.value = data
  inventoryMetaData.value = rest

  inventoryLoading.value = false

}


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


const fetchPackagingSummary = async params => {
  inventoryPackagingLoading.value = true

  const response = await fetchInventorySummary(localStorage.getItem("baseUrl"), { ...params, category_id__name: 'Packaging' })
  const { data: { data, ...rest } } = response

  inventoryPackagingLoading.value = false
  inventoryPackagingData.value = data

  inventoryPackagingMetaData.value = rest
}

const fetchRawMaterial = async () => {
  materialsLoading.value = true

  const response = await fetchRawMaterials()
  const { data, ...rest } = response

  materialsData.value = data
  materialsMetaData.value = rest

  materialsLoading.value = false
}

const fetchBrands = async (page = 1, search = '') => {
  brandLoading.value = true

  const response = await brandStore.fetchAllbrands(page, search)
  const { data, ...rest } = response

  brandData.value = data
  brandMetaData.value = rest
  brandLoading.value = false
}

const fetchCategories = async (page = 1, search = '') => {
  categoryLoading.value = true

  const response = await categoryStore.fetchAllCategories(page, search)

  const { data, ...rest } = response

  categoryData.value = data
  categoryMetaData.value = rest
  categoryLoading.value = false

}

const fetchSuppliers = async (page = 1, search = '') => {
  supplierLoading.value = true

  const response = await supplierStore.fetchAllSuppliers(page, search)

  const { data, ...rest } = response

  supplierData.value = data
  supplierMetaData.value = rest
  supplierLoading.value = false

}

const fetchStock = async (page = 1, search = '') => {
  stockLoading.value = true

  const response = await restockStore.fetchAllStock(page, search)

  const { data, ...rest } = response

  stockData.value = data
  stockMetaData.value = rest
  stockLoading.value = false

}

const searchBrand = searchQuery => {
  fetchBrands(1, searchQuery)
}

const searchSupplier = searchQuery => {
  fetchSuppliers(1, searchQuery)
}

const searchCategory = searchQuery => {
  fetchCategories(1, searchQuery)
}

watchEffect(() => fetchProduction())
watchEffect(() => fetchBrands())
watchEffect(() => fetchCategories())
watchEffect(() => fetchSuppliers())
watchEffect(() => fetchStock())
watchEffect(() => fetchSummary());
watchEffect(() => fetchPackagingSummary());

const categoryHeaders = ref([
  {
    id: Math.floor(Math.random()),
    name: 'Category Name',
    key: 'name',
  },
  {
    id: Math.floor(Math.random()),
    name: 'Stock',
    key: 'stock',
  },
  {
    id: Math.floor(Math.random()),
    name: 'Created At',
    key: 'date',
  },
  {
    id: Math.floor(Math.random()),
    name: 'Actions',
    key: 'actions',
  },
])

const editBrandData = ref({})

const editCategoryData = ref({})

const editStockData = ref({})

const editSupplierData = ref({})

const categoryTitle = ref('')

const brandTitle = ref('')

const stockTitle = ref('')

const materialTitle = ref('')


const getData = async ({ type, data }) => {
  if (type === 'brand') {
    isAddNewBrandDrawerVisible.value = true;
    brandTitle.value = 'Edit Brand'

    editBrandData.value = data
  }
  if (type === 'category') {
    isAddNewCategoryDrawerVisible.value = true;
    categoryTitle.value = 'Edit Category'

    editCategoryData.value = data

  }
}

const getSupplier = data => {
  editSupplierData.value = data
  isAddNewSupplierDrawerVisible.value = true;
}

const getStock = data => {
  materialTitle.value = 'Edit Material'
  editStockData.value = data
  isAddStockDrawerVisible.value = true;
}

const triggerCategoryDrawer = () => {
  isAddNewCategoryDrawerVisible.value = true
  categoryTitle.value = 'Add New Category'
}

const triggerBrandDrawer = () => {
  isAddNewBrandDrawerVisible.value = true
  brandTitle.value = 'Add New Brand'
}

const triggerSupplierDrawer = () => {
  isAddNewSupplierDrawerVisible.value = true
}

const editMaterialData = ref({})
const isMaterialEditing = ref(false)

const triggerMaterialDrawer = data => {
  isAddNewMaterialDrawerVisible.value = true
  if (data) {
    editMaterialData.value = data
    isMaterialEditing.value = true
  }
}

const triggerStockDrawer = () => {
  isAddStockDrawerVisible.value = true
  stockTitle.value = 'Add New Stock'
}

const addNewBrand = data => {
  fetchBrands()
}

const addNewCategory = data => {
  toasterData.value = data
  fetchCategories()
}

const addSupplier = () => {
  fetchSuppliers()
}

const refetchDelete = type => {
  if (type === 'brand') {
    fetchBrands()
  }
  if (type === 'category') {
    fetchCategories()
  }
}

// tabs
const tabs = [
  {
    title: 'Dashboard',
    icon: 'tabler-users',
    tab: 'dashboard',
    count: 0,
    action: () => 0,
  },
  {
    title: 'Inventory',
    icon: 'tabler-users',
    tab: 'inventory',
    count: 0,
    action: () => 0,
  },
  {
    title: 'Requests',
    icon: 'tabler-lock',
    tab: 'requests',
    count: requestMaterials.value.length,
    action: () => 0,
  },
  {
    title: 'Stock',
    icon: 'tabler-users',
    tab: 'stock',
    count: 0,
    action: () => 0,
  },
  {
    title: 'Brands & Categories',
    icon: 'tabler-lock',
    tab: 'brands-and-categories',
    action: async () => {
    },
  },
  {
    title: 'Suppliers',
    icon: 'tabler-lock',
    tab: 'suppliers',
    action: async () => {
      
    },
  },
  {
    title: 'Settings',
    icon: 'tabler-lock',
    tab: 'settings',
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
        :to="{ name: 'materials-tab', params: { tab: item.tab } }"
        @click.prevent="item?.action"
      >
        {{ item.title }}
        <VBadge
          v-if="item.tab === 'requests'"
          class="mx-5 my-auto"
          color="error"
          :content="item.count"
        />
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <VWindowItem value="dashboard">
        <Dashboard />
      </VWindowItem>

      <VWindowItem value="stock">
        <VCard class="py-5 px-4">
          <div class="d-block d-md-flex align-center justify-content-between mb-5">
            <VCardTitle>Restock History</VCardTitle>
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              class="mx-3 my-3"
              variant="outlined"
              @click="triggerStockDrawer"
            >
              Restock
            </VBtn>
          </div>
          <RawMaterials
            :data="stockData"
            :loading="stockLoading"
            :meta-data="stockMetaData"
            @edit-stock="getStock"
            @page-change="(page) => fetchStock(page)"
          />
        </VCard>
      </VWindowItem>
      <VWindowItem value="brands-and-categories">
        <VCard class="border px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <Search
              :loading="brandLoading"
              @search-query="searchBrand"
            />
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              variant="outlined"
              @click="triggerBrandDrawer"
            >
              Create Brand
            </VBtn>
          </div>
          <BrandsAndCategories
            :table-headers="brandHeaders"
            :table-data="brandData"
            :meta-data="brandMetaData"
            :loading="brandLoading"
            type="brand"
            :toaster-data="toasterData"
            @edit-brands-or-category="(getData)"
            @delete="refetchDelete"
          />
        </VCard>
        <VCard class="border px-5 py-5 mt-5">
          <div class="d-flex justify-content-between mb-5 ">
            <Search
              :loading="categoryLoading"
              @search-query="searchCategory"
            />
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              variant="outlined"
              @click="triggerCategoryDrawer"
            >
              Create Category
            </VBtn>
          </div>
          <BrandsAndCategories
            :table-headers="categoryHeaders"
            :table-data="categoryData"
            :meta-data="categoryMetaData"
            :loading="categoryLoading"
            :toaster-data="toasterData"
            type="category"
            @edit-brands-or-category="(getData)"
            @delete="refetchDelete"
          />
        </VCard>
      </VWindowItem>
      <VWindowItem value="suppliers">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <Search
              :loading="supplierLoading"
              @search-query="searchSupplier"
            />
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              variant="outlined"
              @click="triggerSupplierDrawer"
            >
              Add Supplier
            </VBtn>
          </div>
          <Suppliers
            :data="supplierData"
            :meta-data="supplierMetaData"
            :loading="supplierLoading"
            @edit-supplier="getSupplier"
          />
        </VCard>
      </VWindowItem>
      <VWindowItem value="requests">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between btn_space h-100">
            <VSpacer />
          </div>
          <Requests
            :data="productionData"
            :is-loading="productionLoading"
          />
        </VCard>
      </VWindowItem>
      <VWindowItem value="inventory">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              color="primary"
              class="mx-3"
              variant="outlined"
              @click="triggerStockDrawer"
            >
              Restock
            </VBtn>
            <VBtn
              prepend-icon="tabler-plus"
              class="mx-3"
              @click="triggerMaterialDrawer"
            >
              Add Raw Material
            </VBtn>
          </div>
          <VCardTitle class="bg-grey-300">
            Ingredients
          </VCardTitle>
          <Inventory
            :data="inventoryData"
            :meta-data="inventoryMetaData"
            :loading="inventoryLoading"
            @page-change="(page) => fetchSummary({ page })"
          />
          <VCardTitle class="bg-grey-300">
            Packaging
          </VCardTitle>
          <Inventory
            :data="inventoryPackagingData"
            :meta-data="inventoryPackagingMetaData"
            :loading="inventoryPackagingLoading"
            @page-change="(page) => fetchPackagingSummary({ page })"
          />
        </VCard>
      </VWindowItem>
      <VWindowItem value="settings">
        <CreateForm />
      </VWindowItem>
    </VWindow>
    <AddNewMaterialDrawer
      v-model:isDrawerOpen="isAddNewMaterialDrawerVisible"
      :data="editMaterialData"
      @material-data="fetchSummary"
      @is-editing="isMaterialEditing"
    />
    <AddStockDrawer
      v-model:isDrawerOpen="isAddStockDrawerVisible"
      :title="stockTitle"
      :data="formData"
      @stock-data="fetchStock"
      @update:is-drawer-open="isAddStockDrawerVisible = false"
    />
    <AddNewBrandDrawer
      v-model:isDrawerOpen="isAddNewBrandDrawerVisible"
      :data="editBrandData"
      :title="brandTitle"
      @brand-data="addNewBrand"
    />
    <AddNewCategoryDrawer
      v-model:isDrawerOpen="isAddNewCategoryDrawerVisible"
      :data="editCategoryData"
      :title="categoryTitle"
      @category-data="addNewCategory"
    />
    <AddNewSupplierDrawer
      v-model:isDrawerOpen="isAddNewSupplierDrawerVisible"
      :data="editSupplierData"
      @supplier-data="addSupplier"
    />
    <InventoryFilterDrawer
      :is-drawer-open="isSortFilterOpen"
      @sort-data="fetchSummary"
      @update:is-drawer-open="isSortFilterOpen = false"
    />
  </div>
</template>

<style>
.btn_space {
  padding-block-start: 3.5em;
}
</style>

<route lang="yaml">
meta:
  navActiveLink: materials-tab
</route>
