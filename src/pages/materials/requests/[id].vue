<script setup>
import { formatDate } from '@/@core/utils/formatters';
import IssueSupplyDrawer from '@/views/quality-control/drawers/IssueSupplyDrawer.vue'
import Search from '@/pages/components/Search.vue';
import { useProductionStore, useRawMaterialsStore } from '@/stores'
import Table from '@/pages/components/table.vue';

const emit = defineEmits(['update:production'])
const message = inject('showToaster')
const { fetchSingleProduction, completeSupply } = useProductionStore()
const { fetchSingleRawMaterial } = useRawMaterialsStore()
const route = useRoute()
const router = useRouter()

const productsData = ref([])

const materialData = ref({
  material_inventory: [
    {
      material_inventory_details: [],
    },
  ],
})

const loadings = ref([])

const productstLoading = ref(false)
const productMetaData = ref({})
const issueDrawerVisible = ref(false)

const issueComplete = ref(false)

const completeSupplyData = ref({
  production_date: '',
  shift: '',
  products: [],
})

const ids = computed(() => route.params?.id.split('/'))

const fetchProduction = async () => {

  productstLoading.value = true


  const res = !route.params.id ? { status: 0 } : await fetchSingleProduction(ids.value[0])
  if(res.status === 200){
    console.log(res);

    const p = res.data.products.filter(x => x.id == ids.value[1])

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
      { ingredients: res.data.ingredients,
        packaging_materials: res.data.packaging_materials,
        status: res.data.status,
        shift: res.data.shift,
        created_at: res.data.created_at,
      })
    productsData.value = p
    productstLoading.value = false
  }else{
    productsData.value = []
    productstLoading.value = false
  }
}

const _completeSupply = async () => {

  const res = await completeSupply(ids.value[0], completeSupplyData.value);

  if (res.status === 200) {
    message('Successfully completed supply', 'success')
    loadings.value[0] = false
    await fetchProduction()
  } else {
    loadings.value[0] = false
    message('Failed to complete supply ', 'error')
  }
}

const toggleIssueDrawer = async (val, material) => {
  
  issueDrawerVisible.value = val

  if(material){
    if(material.packaging_material){
      const res = await fetchSingleRawMaterial(material.packaging_material.id)

      materialData.value = { ...res, requestMaterial: material };
      
      return true
    }
    if(material.material_id){
  
      const res = await fetchSingleRawMaterial(material.material_id.id)
  
      materialData.value = { ...res, requestMaterial: material };
  
      return true
    }
  
    return false
  }
}

const searchProduct = searchQuery => {
  // fetchProduction()
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
    key: 'quantity',
  },
  {
    id: 9,
    name: 'Batch No.',
    key: 'action',
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
  {
    id: 9,
    name: 'Batch No.',
    key: 'action',
  },
]

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
      :loading="productstLoading"
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
              <div class="d-flex align-center mb-2">
                <h2
                  class="text-gray-900 text-hover-primary fs-2 fw-bold me-1"
                >
                  {{ productsData[0]?.product_id?.product_name ?? 'N/A' }}
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
                      {{ productsData[0]?.expected_yeild.toLocaleString('en-US') }} {{ productsData[0]?.product_id.pakaged_unit }}
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
              <div class="d-flex flex action_btns">
                <VBtn
                  :disabled="!issueComplete || productsData[1]?.status.includes('QA')"
                  color="primary"
                  class="btn btn-icon btn-bg-light btn-active-color-primary me-5"
                  :loading="loadings[0]"
                  @click="_completeSupply"
                >
                  Supply Completed
                </VBtn>
              </div>
            </div>
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
            <div v-if="currentTab == 0 && productsData[1]">
              <div
                class="ingredients"
              >
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
                  <template #cell-quantity="{ row: products }">
                    {{ products.quantity.toLocaleString('en-US') }} {{ products.material_id.measurement_unit }}
                  </template>
                  <template #cell-action="{ row: products }">
                    <VBtn
                      v-if="!products.material_id.batch_numbers.length"
                      size="small"
                      color="primary"
                      class="btn btn-icon btn-bg-light btn-active-color-primary me-5"
                      @click="() => toggleIssueDrawer(true, products)"
                    >
                      Issue
                    </VBtn>
                    <template v-else>
                      <span
                        v-for="number in products.material_id.batch_numbers.length"
                        :key="number"
                        class="font-weight-bold"
                      >#{{ products.material_id.batch_numbers[products.material_id.batch_numbers.length - 1].batch_number }}, </span>
                    </template>
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
                    {{ products.material_id?.name ?? 'N/A' }}
                  </template>
                  <template #cell-yield="{ row: products }">
                    {{ products.quantity.toLocaleString('en-US') }}  {{ products.material_id?.pakaged_unit }}
                  </template>
                  <template #cell-action="{ row: products }">
                    <VBtn
                      v-if="!products.material_id?.batch_numbers.length"
                      size="small"
                      color="primary"
                      class="btn btn-icon btn-bg-light btn-active-color-primary me-5"
                      @click="() => toggleIssueDrawer(true, products)"
                    >
                      Issue
                    </VBtn>
                    <template v-else>
                      <span
                        v-for="number in products.material_id?.batch_numbers.length"
                        :key="number"
                        class="font-weight-bold"
                      >#{{ products.material_id?.batch_numbers[products.material_id?.batch_numbers.length - 1].batch_number }}, </span>
                    </template>
                  </template>
                </Table>
              </div>
            </div>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
    <IssueSupplyDrawer
      :data="materialData"
      :is-drawer-open="issueDrawerVisible"
      @update:is-drawer-open="val => toggleIssueDrawer(val)"
      @issue-material="fetchProduction"
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
    navActiveLink: materials-tab
  </route>
