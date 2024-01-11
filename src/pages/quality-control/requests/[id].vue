<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Search from '@/pages/components/Search.vue';
import { useProductionStore } from '@/stores'
import Table from '@/pages/components/table.vue';

const emit = defineEmits(['update:production'])
const message = inject('showToaster')
const { fetchSingleProduction, approveProduction, cancelProduction, approveSupply } = useProductionStore()
const route = useRoute()
const router = useRouter()

const productsData = ref([])
const productstLoading = ref(false)
const productMetaData = ref({})
const isConfirmDialogOpen = ref(false)
const isDeclineDialogOpen = ref(false)
const isConfirmSupplyDialogOpen = ref(false)
const isDeclineSupplyDialogOpen = ref(false)
const issueComplete = ref(false)

const loadings = ref([])

const entityId = ref('');

const completeSupplyData = ref({
  production_date: '',
  shift: '',
  products: [],
})

const ids = route.params.id.split('/')

const fetchProduction = async () => {

  productstLoading.value = true

  const res = !route.params.id ? null : await fetchSingleProduction(ids[0])
  if (res.status === 200) {
    const p = res.data.products.filter(x => x.id == ids[1])

    const checkArr = [...res.data.packaging_materials, ...res.data.ingredients]

    issueComplete.value = checkArr.every(x => (x.material_id && x.material_id.batch_numbers.length > 0))

    if(issueComplete.value){
      completeSupplyData.value.production_date = res.data.production_date,
      completeSupplyData.value.shift = res.data.shift.id,

      checkArr.forEach(product => {
        if(product.material_id.batch_numbers){
          product.material_id.batch_numbers.forEach(batch => {
            completeSupplyData.value.products.push({
              product_id: product.material_id.id,
              batch: batch.batch_number,
            })
          })
        }
      })
    }

    p.push(
      {
        ingredients: res.data.ingredients,
        packaging_materials: res.data.packaging_materials,
        status: res.data.status,
        shift: res.data.shift,
        created_at: res.data.created_at,
      })

    productsData.value = p
    entityId.value = p[0]?.production?.id
    productstLoading.value = false
  } else {
    productsData.value = []
    productstLoading.value = false
  }
}

const tabs = [
  {
    title: 'Raw Materials',
    icon: 'tabler-users',
    tab: '0',
  },

  // {
  //   title: 'Returns/Damages',
  //   icon: 'tabler-lock',
  //   tab: '1',
  // },
  // {
  //   title: 'Finished Product',
  //   icon: 'tabler-lock',
  //   tab: '2',
  // },
  // {
  //   title: 'Timeline',
  //   icon: 'tabler-lock',
  //   tab: '3',
  // },
]

const productHeaders = [
  {
    id: 4,
    name: 'Product',
    key: 'product',
  },
  {
    id: 1,
    name: 'Lot Number',
    key: 'lot',
  },
  {
    id: 8,
    name: 'Yield',
    key: 'yield',
  },
  {
    id: 10,
    name: 'Shift',
    key: 'shift',
  },
  {
    id: 3,
    name: 'Date',
    key: 'date',
  },
]

const ingredientsHeaders = [
  {
    id: 4,
    name: 'Name',
    key: 'product',
  },
  {
    id: 8,
    name: 'Quantity',
    key: 'yield',
  },
]


const packagingHeaders = [
  {
    id: 4,
    name: 'Name',
    key: 'product',
  },
  {
    id: 8,
    name: 'Quantity',
    key: 'yield',
  },
]

const approveEntity = async id => {

  const res = await approveProduction(id, {
    production_date: productsData.value[0].production.production_date,
    shift: productsData.value[1].shift.id,
    products: [{
      product_id: productsData.value[0].product_id.id,
    }],
    company_id: null,
  })

  if (res.status === 200) {
    message('Successfully approved production', 'success')
    loadings.value[0] = false
    await fetchProduction()
  } else {
    loadings.value[0] = false
    message('Failed to approve production', 'error')
  }

  emit('update:production')
}

const approveSupplyEntity = async () => {
  const res = await approveSupply(ids[0], completeSupplyData.value)
  if (res.status === 200) {
    message('Successfully approved supply', 'success')
    loadings.value[0] = false
    await fetchProduction()
  } else {
    loadings.value[0] = false
    message('Failed to approve supply', 'error')
  }

}

const declineEntity = async id => {

  const res = await cancelProduction(id, {
    production_date: productsData.value[0].production.production_date,
    shift: productsData.value[1].shift.id,
    products: [{
      product_id: productsData.value[0].product_id.id,
    }],
    company_id: null,
  })

  if (res.status === 200) {
    message('Successfully declined production request', 'success')
    await fetchProduction()
  } else {
    message('Failed to decline production request', 'error')
  }

  emit('update:production')
}

const declineSupplyEntity = async id => {

  const res = await cancelProduction(id, {
    production_date: productsData.value[0].production.production_date,
    shift: productsData.value[1].shift.id,
    products: [{
      product_id: productsData.value[0].product_id.id,
    }],
    company_id: null,
  })

  if (res.status === 200) {
    message('Successfully declined production request', 'success')
    await fetchProduction()
  } else {
    message('Failed to decline production request', 'error')
  }

  emit('update:production')
}

const currentTab = ref(0)
const totalTabs = tabs.length

const resolveDataStatusVariant = status => {
  status = status?.toLowerCase()
  if (status === 'approved')
    return {
      variant: 'success',
      icon: 'tabler-circle-half-2',
    }
  if (status === 'pending')
    return {
      variant: 'warning',
      icon: 'tabler-chart-pie',
    }
  if (status === 'cancelled')
    return {
      variant: 'error',
      icon: 'tabler-info-circle',
    }

  return {
    variant: 'info',
    icon: 'tabler-x',
  }
}

watchEffect(() => fetchProduction())
</script>

<template v-if="productsData.length > 0">
  <section class="d-flex flex-column">
    <div class="float-right mb-3">
      <VBtn
        prepend-icon="tabler-arrow-left"
        variant="tonal"
        color="secondary"
        class="mb-2"
        @click="router.go(-1)"
      >
        back
      </VBtn>
    </div>
    <VCard
      flat
      color="gray"
    >
      <VCardText class="w-100 mb-5">
        <div class="d-flex me-7 mb-4">
          <div class="w-25">
            <img
              class="w-75 rounded"
              src="@/assets/images/blank-image.svg"
              alt="image"
            >
          </div>
          <div class="d-flex mb-2 w-75">
            <!-- begin::User -->
            <div class="d-flex flex-column">
              <!-- begin::Name -->
              <div class="d-flex align-items-center align-center mb-2">
                <h2 class="text-gray-900 text-hover-primary fs-2 fw-bold me-1">
                  {{ productsData[0]?.product_id.product_name }}
                </h2>
                <VChip
                  class="mx-2"
                  label
                  :color="resolveDataStatusVariant(productsData[1]?.status).variant"
                >
                  Production {{ productsData[1]?.status }}
                </VChip>
              </div>
              <!-- end::Name -->

              <!-- begin::Info -->
              <div class="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                <h5 class="d-flex align-items-center text-disabled text-hover-primary me-5 mb-2">
                  <VIcon icon="tabler-stack-2" />Request Date: {{ formatDate(productsData[1]?.created_at) }}
                </h5>
              </div>
              <!-- end::Info -->
              <div class="d-flex flex-wrap mt-8">
                <!-- begin::Stat -->
                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <!-- begin::Number -->
                  <div class="d-flex align-items-center">
                    <VIcon
                      icon="tabler-caret-up"
                      color="success"
                    />
                    <div
                      class="fs-2 fw-bold counted"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                      data-kt-initialized="1"
                    >
                      {{ productsData[0]?.expected_yeild.toLocaleString('en-US') }} {{
                        productsData[0]?.product_id.pakaged_unit }}
                    </div>
                  </div>
                  <!-- end::Number -->

                  <!-- begin::Label -->
                  <div class="fw-semibold fs-6 text-disabled">
                    Expected Yield
                  </div>
                  <!-- end::Label -->
                </div>
                <!-- end::Stat -->

                <!-- begin::Stat -->
                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <!-- begin::Number -->
                  <div class="d-flex align-items-center">
                    <VIcon
                      icon="tabler-caret-down"
                      color="error"
                    />
                    <div
                      class="fs-2 fw-bold counted"
                      data-kt-countup="true"
                      data-kt-countup-value="80"
                      data-kt-initialized="1"
                    >
                      -
                    </div>
                  </div>
                  <!-- end::Number -->

                  <!-- begin::Label -->
                  <div class="fw-semibold fs-6 text-disabled">
                    Lot
                  </div>
                  <!-- end::Label -->
                </div>
                <!-- end::Stat -->

                <!-- begin::Stat -->
                <div class="border border-disabled border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <!-- begin::Number -->
                  <div class="d-flex align-items-center">
                    <div
                      class="fs-2 fw-bold counted"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                      data-kt-initialized="1"
                    >
                      20th March 2023
                    </div>
                  </div>
                  <!-- end::Number -->

                  <!-- begin::Label -->
                  <div class="fw-semibold fs-6 text-disabled">
                    Expiry Date
                  </div>
                  <!-- end::Label -->
                </div>
                <!-- end::Stat -->
              </div>
              <div 
                v-if="productsData[1]?.status.includes('Waiting For QA Approval')"
                class="d-flex flex action_btns"
              >
                <VBtn
                  :disabled="productsData[1]?.status.includes('Waiting For QA Approval') ? false : true"
                  color="success"
                  size="large"
                  :loading="loadings[0]"
                  prepend-icon="tabler-check"
                  class="btn btn-icon btn-bg-light btn-active-color-primary me-5"
                  @click="isConfirmDialogOpen = true"
                >
                  Approve Request
                </VBtn>
                <VBtn
                  :disabled="productsData[1]?.status.includes('Waiting For QA Approval') ? false : true"
                  size="large"
                  prepend-icon="tabler-x"
                  :loading="loadings[0]"
                  class="btn btn-icon btn-bg-light btn-active-color-primary"
                  @click="isDeclineDialogOpen = true"
                >
                  Decline
                </VBtn>
              </div>
              <div
                v-if="productsData[1]?.status.includes('Supplied Pending QA Approval')"
                class="d-flex flex action_btns"
              >
                <VBtn
                  :disabled="productsData[1]?.status.includes('QA Approved RM Supplied Waiting To Start Production')"
                  color="success"
                  :loading="loadings[0]"
                  size="large"
                  prepend-icon="tabler-check"
                  class="btn btn-icon btn-bg-light btn-active-color-primary me-5"
                  @click="isConfirmSupplyDialogOpen = true"
                >
                  Approve Supply
                </VBtn>
                <VBtn
                  :disabled="productsData[1]?.status.includes('QA Approved RM Supplied Waiting To Start Production')"
                  size="large"
                  :loading="loadings[0]"
                  prepend-icon="tabler-x"
                  class="btn btn-icon btn-bg-light btn-active-color-primary"
                  @click="isDeclineSupplyDialogOpen = true"
                >
                  Cancel
                </VBtn>
              </div>
            </div>
            <!-- end::User -->
            <VSpacer />
          </div>
        </div>
      </VCardText>
      <VCardText class="d-flex flex justify-between w-100">
        <!-- 👉 Tabs -->
        <VTabs
          v-model="currentTab"
          class="mx-0"
        >
          <VTab
            v-for="tab in tabs"
            :key="tab.icon"
            :value="tab.tab"
            class="text-high-emphasis"
            @click.prevent="currentTab = tab.tab"
          >
            {{ tab.title }}
          </VTab>
        </VTabs>
      </VCardText>
    </VCard>
    <VCard
      flat
      class="my-5"
    >
      <VCardText>
        <VWindow v-model="currentTab">
          <VWindowItem :value="currentTab">
            <div v-if="currentTab == 0">
              <div class="ingredients">
                <div class="d-flex justify-content-between">
                  <VCardText>Ingredients</VCardText>
                  <VSpacer />
                </div>
                <Table
                  :table-header="ingredientsHeaders"
                  :table-data="productsData[1]?.ingredients"
                  :is-loading="productstLoading"
                >
                  <template #cell-product="{ row: products }">
                    {{ products.material_id.name }}
                  </template>
                  <template #cell-yield="{ row: products }">
                    {{ products.quantity.toLocaleString('en-US') }} {{ products.material_id.measurement_unit }}
                  </template>
                </Table>
              </div>
              <div class="packaging">
                <div class="d-flex justify-content-between">
                  <VCardText>
                    Packaging Materials
                  </VCardText>
                  <VSpacer />
                </div>
                <Table
                  :table-header="packagingHeaders"
                  :table-data="productsData[1]?.packaging_materials"
                  :is-loading="productstLoading"
                >
                  <template #cell-product="{ row: products }">
                    {{ products.material_id.name }}
                  </template>
                  <template #cell-yield="{ row: products }">
                    {{ products.quantity.toLocaleString('en-US') }} {{ products.material_id.measurement_unit }}
                  </template>
                </Table>
              </div>
            </div>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
    <ConfirmDialog
      v-model:isDialogVisible="isConfirmDialogOpen"
      confirmation-msg="Are you sure you want to approve this production request?"
      @confirm="(isConfirmed) => {
        if (isConfirmed) {
          approveEntity(entityId)
        }
      }"
    />
    <ConfirmDialog
      v-model:isDialogVisible="isDeclineDialogOpen"
      confirmation-msg="Are you sure you want to decline this production request?"
      @confirm="(isConfirmed) => {
        if (isConfirmed) {
          declineEntity(entityId)
        }
      }"
    />
    <ConfirmDialog
      v-model:isDialogVisible="isConfirmSupplyDialogOpen"
      confirmation-msg="Are you sure you want to approve this supply?"
      @confirm="(isConfirmed) => {
        if (isConfirmed) {
          approveSupplyEntity(entityId)
        }
      }"
    />
    <ConfirmDialog
      v-model:isDialogVisible="isDeclineSupplyDialogOpen"
      confirmation-msg="Are you sure you want to cancel this supply?"
      @confirm="(isConfirmed) => {
        if (isConfirmed) {
          declineSupplyEntity(entityId)
        }
      }"
    />
  </section>
</template>

<style lang="scss">
.faq-v-window {
  .v-window__container {
    z-index: 0;
  }
}

.product_image {
  width: 8em;
  border-radius: 0.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(var(--v-theme-on-primary));
  color: rgb(var(--v-theme-primary));
  font-size: 1rem;
  padding: 2em;
  word-wrap: break-word;
  text-align: center;
}
</style>

<route lang="yaml">
  meta:
    navActiveLink: quality-control-tab
  </route>
