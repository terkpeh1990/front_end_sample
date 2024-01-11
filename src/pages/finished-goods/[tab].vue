<script setup>
import Search from '@/pages/components/Search.vue';
import History from '@/views/production/history.vue'
import Recipe from '@/views/production/Recipe.vue'
import Product from '@/views/production/product.vue'
import AddNewRequestForProductDrawer from '@/views/production/drawers/AddNewRequestForProductDrawer.vue'
import AddNewProductDrawer from '@/views/production/drawers/AddNewProductDrawer.vue'
import CardAddRecipe from '@/@core/components/CardAddRecipe.vue';
import { useRecipeStore, useProductStore } from '@/stores'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'
import { useRoute } from 'vue-router';

const vuetifyTheme = useTheme()

const recipeData = ref([])
const recipeMetaData = ref({})
const productMetaData = ref({})
const productData = ref([])

const recipeLoading = ref(false)

const isRecipeDialogVisible = ref(false)
const { fetchRecipes } = useRecipeStore()
const { fetchProducts } = useProductStore()

const triggerDialog = val => {
  isRecipeDialogVisible.value = val
}


const isAddNewRequestDrawerVisible = ref(false)
const isAddNewRProductDrawerVisible = ref(false)
const productLoading = ref(false)

const triggerRequestMaterialDrawer = () => {
  isAddNewRequestDrawerVisible.value = true
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

const searchProduct = searchQuery => {
  fetchProduct(1, searchQuery)
}

// watchEffect(() => fetchProduct())
// watchEffect(() => fetchRecipe())

// tabs
const tabs = [
  {
    title: 'Inventory',
    icon: 'tabler-users',
    tab: 'products',
  },
  {
    title: 'Request',
    icon: 'tabler-lock',
    tab: 'request',
  },
  {
    title: 'From Production',
    icon: 'tabler-lock',
    tab: 'history',
  },
  {
    title: 'From External',
    icon: 'tabler-lock',
    tab: 'external',
  },
]
</script>

<template>
  <div>
    <VTabs v-model="activeTab">
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'finished-goods-tab', params: { tab: item.tab } }"
      >
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <VWindowItem value="history">
        <VCard class="border px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <VCardTitle>Product History</VCardTitle>
            <VSpacer />
          </div>
          <History
            :data="[]"
            :meta-data="{}"
            :loading="false"
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
          </div>
          <Product
            :data="[]"
            :meta-data="{}"
            :loading="false"
          />
        </VCard>
      </VWindowItem>
      <VWindowItem value="request">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <Search
              :loading="productLoading"
              @search-query="searchProduct"
            />
            <VSpacer />
          </div>
          <Product
            :data="[]"
            :meta-data="{}"
            :loading="false"
          />
        </VCard>
      </VWindowItem>

      <VWindowItem value="external">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              variant="outlined"
              class="me-3"
              @click="() => 0"
            >
              Restock
            </VBtn>
            <VBtn
              prepend-icon="tabler-plus"
              variant="outlined"
              class="me-3"
              @click="() => 0"
            >
              New Finished Product
            </VBtn>
          </div>
          <Recipe
            :data="[]"
            :meta-data="{}"
            :loading="false"
          />
        </VCard>
      </VWindowItem>
    </VWindow>
    <AddNewRequestForProductDrawer
      v-model:isDrawerOpen="isAddNewRequestDrawerVisible"
      @update:is-drawer-open="isAddNewRequestDrawerVisible = false"
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
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: finished-goods-tab
</route>
