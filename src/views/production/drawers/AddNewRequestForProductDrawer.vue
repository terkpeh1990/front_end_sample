<script setup>
import { formatDate } from '@/@core/utils/formatters'
import { useProductStore, useProductionStore } from '@/stores'

import {
  requiredValidator,
} from '@validators';
import { getUser } from '@core/services/JwtService'


const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  title: { type: String, default: () => "Add New Stock" },
})


const emit = defineEmits([
  'update:isDrawerOpen',
  'productionData',
])

const { fetchProducts } = useProductStore()
const { createProduction, fetchShifts } = useProductionStore()

const message = inject('showToaster')

const isFormValid = ref(false)
const refForm = ref()
const currentTab = ref(1)

const items = [
  'data',
  'summary',
]

const totalTabs = items.length


const formData = ref({
  products: [
    {
      product_id: '',
      batch: '',
    },
  ],
  production_date: '',
  shift: '',
})

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

const productData = ref([])
const shift = ref([])


const fetchProduct = async (page = 1, search = '') => {

  const res = await fetchProducts(page, search, 50)
  const { data } = res

  productData.value = data

}

const fetchShift = async () => {

  const res = await fetchShifts()
  const { data } = res

  shift.value = data

}

const addItem = () => {

  // eslint-disable-next-line vue/no-mutating-props
  formData.value.products.push({
    product_id: '',
    batches: '',
  })
}

const removeProduct = id => {

  // eslint-disable-next-line vue/no-mutating-props
  formData.value.products.splice(id, 1)
}

const processData = async () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid && currentTab.value !== totalTabs) {
      currentTab.value += 1
    }
  })
}

const submit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      loadings.value[0] = true

      const data = structuredClone(toRaw(formData.value))

      data.products.forEach((product => {
        product.product_id = product.product_id.id
      }))

      const res = await createProduction({ ...data, shift: data.shift.id, company_id: JSON.parse(getUser().company_id) })
      if (res.status === 201) {
        message('Successfully requested for Production Materials', 'success')
        emit("productionData")
        closeNavigationDrawer()
      } else {
        loadings.value[0] = false
        message('Failed to place request for Production', 'error')
      }
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

watchEffect(() => fetchProduct())
watchEffect(() => fetchShift())
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
        <h6 class="text-h6">
          New Production
        </h6>

        <VSpacer />
        <div v-if="currentTab === 1">
          <VBtn
            variant="outlined"
            class="mx-2"
            @click="closeNavigationDrawer"
          >
            <VIcon
              size="18"
              icon="tabler-x"
            />
            Cancel
          </VBtn>
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
                        <VCol xs="12">
                          <div class="ma-sm-4">
                            <VTextField
                              v-model="formData.production_date"
                              type="date"
                              label="Date"
                              :rules="[requiredValidator]"
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
                          <div class="ma-sm-4">
                            <VSelect
                              v-model="formData.shift"
                              :rules="[requiredValidator]"
                              label="Production Shift"
                              :items="shift"
                              item-title="name"
                              return-object
                            />
                          </div>
                        </VCol>
                      </VRow>
                      <div class="border">
                        <div
                          v-for="(_item, i) in formData.products"
                          :key="i"
                        >
                          <VRow>
                            <VCol cols="6">
                              <div class="ma-sm-4">
                                <VAutocomplete
                                  v-model="_item.product_id"
                                  label="Select Product"
                                  :rules="[requiredValidator]"
                                  :items="productData"
                                  item-title="product_name"
                                  return-object
                                />
                              </div>
                            </VCol>
                            <VCol
                              cols="5"
                            >
                              <div class="ma-sm-4">
                                <VTextField
                                  v-model="_item.batch"
                                  type="number"
                                  :rules="[requiredValidator]"
                                  label="Request Batches"
                                />
                              </div>
                            </VCol>
                            <VCol cols="1">
                              <div class="d-flex flex-column justify-center align-center border-s pa-3">
                                <VBtn
                                  icon
                                  size="x-small"
                                  color="default"
                                  variant="text"
                                  @click="removeProduct"
                                >
                                  <VIcon
                                    size="20"
                                    icon="tabler-x"
                                  />
                                </VBtn>
                              </div>
                            </VCol>
                          </VRow>
                        </div>
                        <div class="mt-4 ma-sm-4">
                          <VBtn 
                            size="small"
                            variant="tonal"
                            @click.prevent="addItem"
                          >
                            Add More
                          </VBtn>
                        </div>
                      </div>
                    </VCardText>
                  </div>
                  <div v-else>
                    <VCardText
                      v-for="(prod, i) in formData.products"
                      :key="i"
                    >
                    <hr>
                      <h4 class="mt-4">
                        Summary
                      </h4>
                      <div class="flex d-flex mt-4 ma-sm-4">
                        <div class="">
                          <p>
                            <span class="font-weight-bold">Product:</span> {{ prod.product_id.product_name }}
                          </p>
                          <p>
                            <span class="font-weight-bold">Batches Requested:</span> {{ prod.batch }}
                          </p>
                        </div>
                        <VSpacer />
                        <div class="">
                          <p>
                            <span class="font-weight-bold">Request Date:</span> {{ formatDate(formData.production_date) }}
                          </p>
                          <p>
                            <span class="font-weight-bold">Expected Yield:</span> {{ prod.product_id.base_yeild }} {{ prod.product_id.pakaged_unit }}
                          </p>
                        </div>
                      </div>
                      <hr>
                      <VCardTitle>Raw Materials</VCardTitle>
                      <VTable v-if="prod.product_id?.recipe">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              class="text-center"
                            >
                              #
                            </th>
                            <th scope="col">
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
                            v-for="(material, i) in prod.product_id?.recipe?.ingrediants"
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
                      <hr>
                      <VCardTitle class="mt-3">
                        Packaging Materials
                      </VCardTitle>
                      <VTable v-if="prod.product_id?.packaging_materials">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              class="text-center"
                            >
                              #
                            </th>
                            <th scope="col">
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
                            v-for="(material, j) in prod.product_id?.packaging_materials"
                            :key="material.id"
                          >
                            <td class="text-center">
                              {{ j + 1 }}
                            </td>
                            <td>
                              {{ material.packaging_material.name }}
                            </td>
                            <td class="text-center">
                              {{ material.quantity }} {{ material.packaging_material.measurement_unit }}
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
                    </VCardText>
                    <hr>
                  </div>
                </VWindowItem>
              </VWindow>
            </div>
          </VCol>
        </VRow>
      </div>
    </VForm>
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
