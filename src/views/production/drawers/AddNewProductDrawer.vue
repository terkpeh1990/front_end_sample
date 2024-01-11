<script setup>
import { getUser } from '@/@core/services/JwtService';
import { useRecipeStore, useBrandStore, useProductStore } from '@/stores';
import ProductEdit from '../forms/ProductEdit.vue';
import CardAddRecipe from '@/@core/components/CardAddRecipe.vue';
import {
  requiredValidator,
} from '@validators';

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  title: { type: String, default: () => "Add New Stock" },
  recipeCardVisible: { type: Boolean, default: () => false },
})


const emit = defineEmits([
  'update:isDrawerOpen',
  'productData',
])

const { fetchRecipes } = useRecipeStore()
const { fetchAllbrands } = useBrandStore()
const { createProduct } = useProductStore()

const recipeData = ref([])
const brandsData = ref([])

const useDropdown = async () => {
  const recipes = await fetchRecipes()
  const brands = await fetchAllbrands()

  recipeData.value = recipes.data
  brandsData.value = brands.data
}

const message = inject('showToaster')

const isFormValid = ref(false)
const refForm = ref()
const currentTab = ref(1)

const items = [
  'data',
  'summary',
]

const totalTabs = items.length

const processData = async () => {
  refForm.value?.validate().then( async ({ valid }) => {
    if (valid && currentTab.value !== totalTabs) {
      currentTab.value += 1
    }
  })
}

const formData = ref({
  brand_id: '',
  category_id: '',
  product_name: '',
  recipe: '',
  packaging_materials: [],
  quantity: '',
  unit: '',
})

const isRecipeDialogVisible = ref(props.recipeCardVisible)

const triggerDialog = val => {
  isRecipeDialogVisible.value = val
}

const fetchRecipe = val => {
  isRecipeDialogVisible.value = val
}

const addItem = () => {

  formData.value.packaging_materials = [...formData.value.packaging_materials, {
    quantity: '',
    packaging_material: '',
    packaged_unit: '',
  }]
}

const removeProduct = id => {

  // eslint-disable-next-line vue/no-mutating-props
  formData.value.packaging_materials.splice(id, 1)
}

const loadings = ref([])

// 👉 drawer close
const closeNavigationDrawer = () => {
  loadings.value[0] = false
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const submit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      loadings.value[0] = true
      formData.value.packaging_materials.forEach(m => m.packaging_material = m.packaging_material.id)

      const res = await createProduct({ ...formData.value, brand_id: formData.value.brand_id.id, recipe: formData.value.recipe.id, pakaged_unit: formData.value.unit, base_yeild: formData.value.quantity })
      if (res.status === 201) {
        message('Successfully added a new product', 'success')
        emit("productData")
        closeNavigationDrawer()
        currentTab.value = 1
        formData.value = {
          brand_id: '',
          category_id: '',
          product_name: '',
          recipe: '',
          packaging_materials: [],
          quantity: '',
          unit: '',
        }
      }else {
        loadings.value[0] = false
        message('Failed to add new product', 'error')
      }
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

watchEffect(() => useDropdown())
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="650"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <VForm
      ref="refForm"
      v-model="isFormValid"
      class="overflow-auto"
      @submit.prevent="submit"
    >
      <div class="d-flex align-center pa-6 pb-1 bg-tonal">
        <h6
          class="text-h6"
        >
          New Product
        </h6>
        <VSpacer />
        <div v-if="currentTab === 1">
          <VBtn
            color="primary"
            class="mx-2"
            @click="processData"
          >
            <VIcon
              size="18"
              icon="tabler-arrow-right"
            />
            Next
          </VBtn>
        </div>
        <div v-else>
          <VBtn
            color="primary"
            variant="outlined"
            class="mx-2"
            @click="currentTab -= 1"
          >
            <VIcon
              size="18"
              icon="tabler-arrow-left"
            />
            Previous
          </VBtn>
          <VBtn
            class="mx-2"
            :loading="loadings[0]"
            type="submit"
          >
            <VIcon
              size="18"
              icon="tabler-check"
            />
            Submit
          </VBtn>
        </div>
      </div>


      <div>
        <VRow>
          <VCol
            cols="12"
            md="12"
          >
            <div class="mx-5">
              <!-- SECTION Header -->
              <!--  eslint-disable vue/no-mutating-props -->
              <VWindow v-model="currentTab">
                <VWindowItem
                  v-for="item in items.length"
                  :key="item"
                  :value="item"
                >
                  <div v-if="currentTab === 1">
                    <VCardText>
                      <VRow>
                        <VCol
                          xs="12"
                        >      
                          <div class="mt-1 ma-sm-4">
                            <VAutocomplete
                              v-model="formData.brand_id"
                              label="Select Brand"
                              :rules="[requiredValidator]"
                              :items="brandsData"
                              item-title="brand_name"
                              item-value="id"
                              return-object
                            />
                          </div>
                        </VCol>
                        <VCol
                          cols="12"
                          lg="6"
                          md="6"
                          sm="6"
                          xs="12"
                        >      
                          <div class="mt-1 ma-sm-4">
                            <VTextField
                              v-model="formData.product_name"
                              :rules="[requiredValidator]"
                              label="Product Name"
                            />
                          </div>
                        </VCol>
                        <VCol
                          cols="12"
                          lg="6"
                          md="6"
                          sm="6"
                          xs="12"
                        >      
                          <div class="mt-1 ma-sm-4">
                            <VAutocomplete
                              v-model="formData.recipe"
                              label="Select Recipe"
                              :rules="[requiredValidator]"
                              :items="recipeData"
                              item-title="name"
                              item-value="id"
                              return-object
                            />
                          </div>
                        </VCol>
                        <VCol
                          cols="12"
                          lg="6"
                          md="6"
                          sm="6"
                          xs="12"
                        >      
                          <div class="mt-1 ma-sm-4">
                            <VBtn
                              color="primary"
                              variant="outlined"
                              class="mx-2"
                              @click="isRecipeDialogVisible = true"
                            >
                              <VIcon
                                size="18"
                                icon="tabler-plus"
                              />
                              Add Recipe
                            </VBtn>
                          </div>
                        </VCol>
                      </VRow>
                    </VCardText>
        
                    <VCardText class="add-products-form">
                      <VCardText>
                        <h3 class="my-2">
                          Packaging Materials
                        </h3>
                      </VCardText>
      
                      <div
                        class="border"
                      >
                        <div
                          v-for="(product, index) in formData.packaging_materials"
                          :key="product.title"
                          class="ma-sm-4"
                        >
                          <ProductEdit
                            :id="index"
                            :data="product"
                            @remove-product="removeProduct"
                          />
                        </div>
                        <div class="mt-4 ma-sm-4">
                          <VBtn
                            size="small"
                            variant="tonal"
                            @click="addItem"
                          >
                            Add More
                          </VBtn>
                        </div>
                      </div>
                    </VCardText>
                  </div>
                  <div v-else>
                    <VCardText>
                      <hr>
                      <h4 class="mt-7">
                        Summary
                      </h4>
                      <div class="flex flex-column ma-sm-4">
                        <div class="mx-2">
                          <p class="font-weight-medium">
                            Name: {{ formData.product_name }}
                          </p>
                        </div>
                        <VSpacer />
                      </div>
                      <div class="top-border mt-7">
                        <hr>
                        <VCardTitle>Recipe for one batch</VCardTitle>
                        <VTable v-if="formData.recipe">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                class="text-center"
                              >
                                #
                              </th>
                              <th
                                scope="col"
                              >
                                MATERIAL
                              </th>
                              <th
                                scope="col"
                                class="text-center"
                              >
                                QUANTITY
                              </th>
                            </tr>
                          </thead>
      
                          <tbody>
                            <tr
                              v-for="(material, i) in formData.recipe?.ingrediants"
                              :key="material.id"
                            >
                              <td class="text-center">
                                {{ i + 1 }}
                              </td>
                              <td>
                                {{ material.ingrediant.name }}
                              </td>
                              <td class="text-center">
                                {{ material.quantity }} {{ material.ingrediant.measurement_unit }}
                              </td>
                            </tr>
                          </tbody>
                        </VTable>
                        <div
                          v-else
                          class="empty_state mt-5 text-center"
                        >
                          <img
                            src="@images/empy_state.svg"
                            alt=""
                          >
                          <p class="mt-0">
                            No Material Selected
                          </p>
                        </div>
                      </div>
                      <div class="top-border mt-7">
                        <hr>
                        <VCardTitle>Packaging for one batch</VCardTitle>
                        <VTable v-if="formData.packaging_materials">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                class="text-center"
                              >
                                #
                              </th>
                              <th
                                scope="col"
                              >
                                MATERIAL
                              </th>
                              <th
                                scope="col"
                                class="text-center"
                              >
                                QUANTITY
                              </th>
                            </tr>
                          </thead>
      
                          <tbody>
                            <tr
                              v-for="(material, i) in formData.packaging_materials"
                              :key="material.id"
                            >
                              <td class="text-center">
                                {{ i + 1 }}
                              </td>
                              <td>
                                {{ material.packaging_material.name }}
                              </td>
                              <td class="text-center">
                                {{ material.quantity }} {{ material.packaged_unit }}
                              </td>
                            </tr>
                          </tbody>
                        </VTable>
                        <div
                          v-else
                          class="empty_state mt-5 text-center"
                        >
                          <img
                            src="@images/empy_state.svg"
                            alt=""
                          >
                          <p class="mt-0">
                            No Material Selected
                          </p>
                        </div>
                      </div>
                      <div class="top-border mt-7">
                        <hr>
                        <VCardTitle>Expected Yield for one batch</VCardTitle>
                        <VRow>
                          <VCol
                            cols="6"
                            xs="12"
                          >      
                            <div class="mt-1 ma-sm-4">
                              <VTextField
                                v-model="formData.quantity"
                                type="number"
                                label="Quantity"
                                :rules="[requiredValidator]"
                              />
                            </div>
                          </VCol>
                          <VCol
                            cols="6"
                            lg="6"
                            md="6"
                            sm="6"
                            xs="12"
                          >      
                            <div class="mt-1 ma-sm-4">
                              <VTextField
                                v-model="formData.unit"
                                :rules="[requiredValidator]"
                                label="Unit"
                              />
                            </div>
                          </VCol>
                        </VRow>
                      </div>
                    </VCardText>
                  </div>
                </VWindowItem>
              </VWindow>
            </div>
          </VCol>
        </VRow>
      </div>
    </VForm>
    <CardAddRecipe
      :is-dialog-visible="isRecipeDialogVisible"
      @recipe-data="useDropdown"
      @update:is-dialog-visible="triggerDialog"
    />
  </VNavigationDrawer>
</template>

<style scoped>
.form_section {
  margin-block-start: 3em;
}

.scrollable-content {
  overflow-y: scroll !important;
}
</style>
