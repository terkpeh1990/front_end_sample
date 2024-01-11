<script setup>
import { formatDate } from '@/@core/utils/formatters'
import Table from '@/pages/components/table.vue';
import Search from '@/pages/components/Search.vue';
import Loader from '@/pages/components/Loader.vue';
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
  data: {
    type: Object,
    default: () => {
      material_inventory: [
        {
          material_inventory_details: [],
        },
      ]
    },
  },
})


const emit = defineEmits([
  'update:isDrawerOpen',
  'issueMaterial',
])

const { fetchProducts } = useProductStore()
const { issueMaterial, fetchShifts } = useProductionStore()

const route = useRoute()

const message = inject('showToaster')
const ids = route.params.id.split('/')

const isFormValid = ref(false)
const accountingType = ref(true)
const batchLoading = ref(true)
const searchClass = ref('min-width')

const searchBatch = () => {

}

const refForm = ref()
const currentTab = ref(1)

const items = [
  'data',
  'summary',
]

const totalTabs = items.length

const tableHeader = ref([
  {
    id: 4,
    name: 'Batch No.',
    key: 'batch',
  },
  {
    id: 1,
    name: 'Quantity',
    key: 'quantity',
  },
  {
    id: 8,
    name: 'Expiry Date',
    key: 'date',
  },
])

const manualTableHeader = ref([
  {
    id: 4,
    name: 'Batch No.',
    key: 'batch',
  },
  {
    id: 1,
    name: 'Available Qty.',
    key: 'quantity',
  },
  {
    id: 8,
    name: 'Expiry Date',
    key: 'date',
  },
  {
    id: 8,
    name: 'Qty. Supplied',
    key: 'supplied',
  },
  {
    id: 8,
    name: 'Action',
    key: 'action',
  },
])

const manualTableData = ref([
  {
    id: 1,
    batch: 'BCL-201-805',
    quantity: '150kg',
    date: new Date(),
  },
  {
    id: 1,
    batch: 'BCL-201-805',
    quantity: '50kg',
    date: new Date(),
  },
  {
    id: 1,
    batch: 'BCL-201-805',
    quantity: '25.5kg',
    date: new Date(),
  },
])

const form = ref([])

const data = computed(() => {
  batchLoading.value = true

  const _ =  props.data.material_inventory[0]?.material_inventory_details

  form.value = []
  if(_ && _.length > 0){
    _.forEach((material, i) => {
      form.value.push({
        id: i + 1,
        batch_number: material.batch_number,
        availableQty: material.avialable_quantity,
        avialable_quantity: `${material.avialable_quantity?.toLocaleString('en-US')} ${props.data?.requestMaterial?.material_id?.measurement_unit}`,
        expiring_date: material.expiring_date,
        quantity: '',
      })
    })
  }else {
    form.value = []
  }
  batchLoading.value = false
  
  return props.data;
})

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

const totalQuantity = ref(0)

const addItem = qty => {
  totalQuantity.value = 0
  form.value.forEach(val => {
    totalQuantity.value += Number(val.quantity)
  })

}

const clearAll = () => {
  totalQuantity.value = 0
  form.value.forEach(val => {
    val.quantity = ''
  })

}

// 👉 drawer close
const closeNavigationDrawer = () => {
  loadings.value[0] = false
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
    clearAll()
    form.value = []
  })
}

const submit = type => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      loadings.value[0] = true

      // eslint-disable-next-line sonarjs/no-unused-collection
      let payload = []
      if(type === 'manual') {
        form.value.forEach(({ quantity, batch_number }) => {
          payload.push({
            quantity: !quantity ? 0 : quantity,
            batch_number,
          })
        })
      }
  

      const res = await issueMaterial(ids[0], data.value.id, { materials: payload })
      if (res.status === 200) {
        message('Successfully issued material', 'success')
        emit("issueMaterial")
        closeNavigationDrawer()
      } else {
        loadings.value[0] = false
        message('Failed to issue material', 'error')
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
    :width="750"
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
        <h6 class="text-h5">
          Issue Supply
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
              <VCardText>
                <hr>
                <h4 class="mt-7 font-weight-medium">
                  <span class="font-weight-bold">Material Name: </span> 
                  {{ data?.name }}
                </h4>
                <h4 class="font-weight-medium">
                  <span class="font-weight-bold">Quantity: </span> {{
                    data?.requestMaterial?.quantity || 'N/A' }} {{
                    data?.requestMaterial?.material_id?.measurement_unit }}
                </h4>
                <hr class="my-5">
                <div class="d-flex flex align-center justify-center">
                  <span
                    :class="[!accountingType ? 'font-weight-bold' : '']"
                    class="me-3"
                  >Manual</span>
                  <VSwitch
                    v-model="accountingType"
                    color="primary"
                  />
                  <span
                    :class="[accountingType ? 'font-weight-bold' : '']"
                    class="mx-3"
                  >FIFO (First In, First Out)</span>
                </div>
                <hr class="my-5">
                <div v-if="accountingType">
                  <template v-if="form">
                    <Table
                      :table-header="tableHeader"
                      :table-data="form"
                      :is-loading="false"
                    >
                      <template #cell-batch="{ row: products }">
                        #{{ products.batch_number }}
                      </template>
                      <template #cell-quantity="{ row: products }">
                        {{ products.avialable_quantity }}
                      </template>
                      <template #cell-date="{ row: products }">
                        {{ formatDate(products.expiring_date) }}
                      </template>
                    </Table>
                  </template>
                  <hr class="my-5">
                  <div class="action_btns mt-5">
                    <VBtn
                      prepend-icon="tabler-checkbox"
                      color="primary"
                      class="me-5"
                      @click.prevent="submit('fifo')"
                    >
                      Save & Continue
                    </VBtn>

                    <VBtn
                      color="secondary"
                      prepend-icon="tabler-circle-minus"
                    >
                      Clear All
                    </VBtn>
                  </div>
                </div>
                <div v-else>
                  <div class="top my-5">
                    <Search
                      :class="searchClass"
                      :loading="batchLoading"
                      @search-query="searchBatch"
                    />
                  </div>
                  <template v-if="form">
                    <VTable
                      hover
                      fixed-footer
                      class="text-no-wrap table-list-table"
                    >
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            class="text-uppercase"
                          >
                            #
                          </th>
                          <th
                            v-for="header in manualTableHeader"
                            :key="header.id"
                            scope="col"
                            class="text-uppercase"
                          >
                            {{ header.name }}
                          </th>
                        </tr>
                      </thead>
                      <template v-if="!batchLoading">
                        <tbody>
                          <template
                            v-for="(item, i) in form"
                            :key="i"
                          >
                            <tr style="height: 3.75rem; cursor: pointer;">
                              <td>
                                {{ i + 1 }}
                              </td>
                              <td>
                                #{{ item.batch_number }}
                              </td>
                              <td>
                                {{ item.avialable_quantity }}
                              </td>
                              <td>
                                {{ formatDate(item.expiring_date) }}
                              </td>
                              <td>
                                <VTextField
                                  v-model="item.quantity"
                                  type="number"
                                  :placeholder="Number(item.availableQty) <= 0 ? 'Out of stock' : 'Enter Quantity'"
                                  :readonly="Number(item.availableQty) <= 0"
                                  :disabled="item.availableQty <= 0"
                                />
                                <small
                                  v-if="item.quantity > Number(item.availableQty)"
                                  class="text-error text-wrap align-center"
                                >Cannot supply more than available</small>
                              </td>
                              <td>
                                <VBtn
                                  variant="tonal"
                                  color="success"
                                  :disabled="item.availableQty <= 0 || item.quantity > Number(item.availableQty)"
                                  @click.prevent="addItem"
                                >
                                  Add
                                </VBtn>
                              </td>
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
                      <tfoot v-show="!batchLoading && form.length < 1">
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
                  </template>
                  <hr class="my-5">
                  <div class="d-flex flex">
                    <VSpacer />
                    <div class="total_fifo">
                      <div class="d-flex flex total_qty">
                        <p>{{ totalQuantity }} {{ data?.requestMaterial?.material_id?.measurement_unit }}</p>
                        <VChip
                          class="mx-2"
                          label
                          :color="data?.requestMaterial?.quantity != totalQuantity ? 'error' : 'success'"
                        >
                          {{ data?.requestMaterial?.quantity != totalQuantity ? 'Pending': 'Completed' }}
                        </VChip>
                      </div>
                      <div class="error_text">
                        <small
                          v-if="data?.requestMaterial?.quantity < totalQuantity"
                          class="text-error"
                        >Cannot supply more than requested</small>
                      </div>
                    </div>
                  </div>
                  <hr class="my-5">
                  <div class="action_btns mt-5">
                    <VBtn
                      :disabled="data?.requestMaterial?.quantity != totalQuantity"
                      prepend-icon="tabler-checkbox"
                      color="primary"
                      class="me-5"
                      :loading="loadings[0]"
                      @click.prevent="submit('manual')"
                    >
                      Save & Continue
                    </VBtn>

                    <VBtn
                      color="secondary"
                      prepend-icon="tabler-circle-minus"
                      @click.prevent="clearAll"
                    >
                      Clear All
                    </VBtn>
                  </div>
                </div>
              </VCardText>
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
.total_fifo {
  margin-right: 1.5em;
}
</style>
