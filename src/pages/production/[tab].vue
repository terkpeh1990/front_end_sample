<script setup>
import Search from '@/pages/components/Search.vue';
import History from '@/views/production/history.vue'
import ProductionRequest from '@/views/production/ProductionRequest.vue'
import Recipe from '@/views/production/Recipe.vue'
import Product from '@/views/production/product.vue'
import AddNewRequestForProductDrawer from '@/views/production/drawers/AddNewRequestForProductDrawer.vue'
import AddNewProductDrawer from '@/views/production/drawers/AddNewProductDrawer.vue'
import CardAddRecipe from '@/@core/components/CardAddRecipe.vue';
import CardEditRecipe from '@/@core/components/CardEditRecipe.vue';
import { useRecipeStore, useProductStore, useProductionStore } from '@/stores'
import { useRoute } from 'vue-router';

const recipeData = ref([])
const recipeMetaData = ref({})
const productMetaData = ref({})
const productData = ref([])
const productionMetaData = ref({})
const productionData = ref([])
const productionHistoryData = ref({})
const productionHistoryMetaData = ref([])

const productionHistoryLoading = ref(false)
const recipeLoading = ref(false)
const recipeEditData = ref({})

const isRecipeDialogVisible = ref(false)
const isRecipeEditDialogVisible = ref(false)
const { fetchRecipes } = useRecipeStore()
const { fetchProducts } = useProductStore()
const { fetchProductions, fetchProductionHistory } = useProductionStore()

const triggerDialog = val => {
  isRecipeDialogVisible.value = val
  isRecipeEditDialogVisible.value = val
}

const isAddNewRequestDrawerVisible = ref(false)
const isAddNewRProductDrawerVisible = ref(false)
const productLoading = ref(false)
const productionLoading = ref(false)


const triggerRequestMaterialDrawer = () => {
  isAddNewRequestDrawerVisible.value = true
}

const triggerRecipeDialog = data => {
  isRecipeEditDialogVisible.value = true
  recipeEditData.value = data
}

const triggerProductDrawer = () => {
  isAddNewRProductDrawerVisible.value = true
}

const route = useRoute()
const activeTab = ref(route.params.tab)

const fetchRecipe = async () => {
  recipeLoading.value = true

  const res = await fetchRecipes()
  const { data, ...rest } = res

  recipeData.value = data
  recipeMetaData.value = rest
  recipeLoading.value = false

}

const fetchProduct = async (page = 1, search = '') => {
  productLoading.value = true

  const res = await fetchProducts(page, search)
  const { data, ...rest } = res

  productData.value = data
  productMetaData.value = rest
  productLoading.value = false

}

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


const fetchProductionHist = async (page = 1, search = '') => {
  productLoading.value = true

  const res = await fetchProductionHistory(page, search)
  const { data, ...rest } = res

  productionHistoryData.value = data
  productionHistoryMetaData.value = rest
  productionHistoryLoading.value = false
}

const searchProduct = searchQuery => {
  fetchProduct(1, searchQuery)
}

watchEffect(() => fetchProduct())
watchEffect(() => fetchRecipe())
watchEffect(() => fetchProduction())
watchEffect(() => fetchProductionHist())

// tabs
const tabs = [
  {
    title: 'Dashboard',
    icon: 'tabler-users',
    tab: 'dashboard',
  },
  {
    title: 'Production',
    icon: 'tabler-lock',
    tab: 'request',
  },
  {
    title: 'History',
    icon: 'tabler-lock',
    tab: 'history',
  },
  {
    title: 'Products',
    icon: 'tabler-lock',
    tab: 'products',
  },
  {
    title: 'Recipe',
    icon: 'tabler-lock',
    tab: 'recipe',
  },
  {
    title: 'Settings',
    icon: 'tabler-lock',
    tab: 'settings',
  },
]


const productionActiveTab = ref(0)
</script>

<template>
  <div>
    <VTabs v-model="activeTab">
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'production-tab', params: { tab: item.tab } }"
      >
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <VWindowItem value="dashboard">
        <VCard class="border px-5 py-5">
          <p>Dashboard</p>
        </VCard>
      </VWindowItem>
      <VWindowItem value="request">
        <ProductionRequest
          :data="productionData"
          :meta-data="productionMetaData"
          :loading="productionLoading"
          @production="triggerRequestMaterialDrawer"
        />
      </VWindowItem>
      <VWindowItem value="history">
        <VCard class="border px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <VCardTitle>Production History</VCardTitle>
            <VSpacer />
          </div>
          <History
            :data="productionHistoryData"
            :meta-data="productionHistoryMetaData"
            :loading="productionHistoryLoading"
          />
        </VCard>
      </VWindowItem>

      <VWindowItem value="products">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <Search
              :loading="productLoading"
              @search-query="searchProduct"
            />
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              @click="triggerProductDrawer"
            >
              Add Product
            </VBtn>
          </div>
          <Product
            :data="productData"
            :meta-data="productMetaData"
            :loading="productLoading"
            @page-change="(page) => fetchProduct(page)"
          />
        </VCard>
      </VWindowItem>

      <VWindowItem value="recipe">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              variant="outlined"
              class="me-3"
              @click="isRecipeDialogVisible = true"
            >
              Add Recipe
            </VBtn>
          </div>
          <Recipe
            :data="recipeData"
            :meta-data="recipeMetaData"
            :loading="recipeLoading"
            @edit-recipe="triggerRecipeDialog"
          />
        </VCard>
      </VWindowItem>
    </VWindow>
    <AddNewRequestForProductDrawer
      v-model:isDrawerOpen="isAddNewRequestDrawerVisible"
      @update:is-drawer-open="isAddNewRequestDrawerVisible = false"
      @production-data="fetchProduction"
    />
    <AddNewProductDrawer
      v-model:isDrawerOpen="isAddNewRProductDrawerVisible"
      :recipe-card-visible="isRecipeDialogVisible"
      @update:is-drawer-open="isAddNewRProductDrawerVisible = false"
      @product-data="fetchProduct"
    />
    <CardAddRecipe
      :is-dialog-visible="isRecipeDialogVisible"
      @update:is-dialog-visible="triggerDialog"
      @recipe-data="fetchRecipe"
    />
    <CardEditRecipe
      :is-dialog-visible="isRecipeEditDialogVisible"
      :data="recipeEditData"
      @update:is-dialog-visible="triggerDialog"
      @recipe-data="fetchRecipe"
    />
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: production-tab
</route>
