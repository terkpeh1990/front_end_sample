<script setup>
import { formatDate } from '@/@core/utils/formatters';
import Search from '@/pages/components/Search.vue';
import { useProductionStore } from '@/stores'
import Table from '@/pages/components/table.vue';

const { fetchSingleProduction, beginProduction } = useProductionStore()
const route = useRoute()
const router = useRouter()

const productsData = ref([])
const productstLoading = ref(false)
const productMetaData = ref({})
const issueComplete = ref(false)

const loadings = ref([])

const ids = route.params.id.split('/')

const completeSupplyData = ref({
  production_date: '',
  shift: '',
  products: [],
})

const fetchProduction = async () => {

  productstLoading.value = true

  const ids = route.params.id.split('/')

  const res = !route.params.id ? null : await fetchSingleProduction(ids[0])
  if(res.status === 200){
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
      { ingredients: res.data.ingredients, 
        packaging_materials: res.data.packaging_materials,
        finished_goods_in_inventory: res.data.finished_goods_in_inventory,
        damaged_materials: res.data.damaged_materials,
        status: res.data.status,
        created_at: res.data.created_at,
      })

    productsData.value = p
    productstLoading.value = false
  }else{
    productsData.value = []
    productstLoading.value = false
  }
}

const startProduction = async () => {
  const res = await beginProduction(ids[0], completeSupplyData.value)
  if (res) {
    message('Production started', 'success')
    loadings.value[0] = false
    await fetchProduction()
  } else {
    loadings.value[0] = false
    message('Failed to start production', 'error')
  }
}



const tabs = [
  {
    title: 'Raw Materials',
    icon: 'tabler-users',
    tab: '0',
  },
  {
    title: 'Returns/Damages',
    icon: 'tabler-lock',
    tab: '1',
  },
  {
    title: 'Finished Product',
    icon: 'tabler-lock',
    tab: '2',
  },
  {
    title: 'Timeline',
    icon: 'tabler-lock',
    tab: '3',
  },
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

const currentTab = ref(0)
const totalTabs = tabs.length

const resolveDataStatusVariant = (status = '') => {
  status = status?.toLowerCase()
  if (status?.includes('start'))
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
    variant: 'secondary',
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
              <div class="d-flex align-items-center mb-2">
                <h2
                  class="text-gray-900 text-hover-primary fs-2 fw-bold me-1"
                >
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
                <h5
                  class="d-flex align-items-center text-disabled text-hover-primary me-5 mb-2"
                >
                  <VIcon icon="tabler-calendar" />
                  Production Date: {{
                    formatDate(productsData[0]?.production.production_date) }}
                </h5>
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
                      55,000 cts
                    </div>
                  </div>
                  <!-- end::Number -->

                  <!-- begin::Label -->
                  <div class="fw-semibold fs-6 text-disabled">
                    Production Yield
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
                      B305
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
            </div>
            <!-- end::User -->
            <VSpacer />
            <!-- begin::Actions -->
            <div class="my-4">
              <div class="me-0">
                <VBtn
                  variant="tonal"
                  append-icon="tabler-dots"
                  class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                >
                  More Actions
                  <VMenu activator="parent">
                    <VList>
                      <VListItem
                        v-if="productsData[1]?.status == 'QA Approved RM Supplied Waiting To Start Production'"
                        @click="startProduction"
                      >
                        <template #prepend>
                          <VIcon
                            size="24"
                            class="me-3"
                            icon="tabler-play"
                          />
                        </template>
      
                        <VListItemTitle>Start Production</VListItemTitle>
                      </VListItem>
                      <VListItem
                        @click="() => true"
                      >
                        <template #prepend>
                          <VIcon
                            size="24"
                            class="me-3"
                            icon="tabler-plus"
                          />
                        </template>
      
                        <VListItemTitle>Add Production Notes</VListItemTitle>
                      </VListItem>
                      <VListItem
                        @click="() => true"
                      >
                        <template #prepend>
                          <VIcon
                            size="24"
                            class="me-3"
                            icon="tabler-stack-3"
                          />
                        </template>
      
                        <VListItemTitle>Request Extra Materials</VListItemTitle>
                      </VListItem>
                      <VListItem
                        @click="() => true"
                      >
                        <template #prepend>
                          <VIcon
                            size="24"
                            class="me-3"
                            icon="tabler-discount-check"
                          />
                        </template>
      
                        <VListItemTitle>Quality Assurance</VListItemTitle>
                      </VListItem>
                      <VListItem
                        @click="() => true"
                      >
                        <template #prepend>
                          <VIcon
                            size="24"
                            class="me-3"
                            icon="tabler-hand-stop"
                          />
                        </template>
      
                        <VListItemTitle>End Production</VListItemTitle>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VBtn>
              </div>
              <!-- end::Menu -->
            </div>
            <!-- end::Actions -->
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
                    {{ products.quantity }} {{ products.material_id.measurement_unit }}
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
                    {{ products.quantity }}  {{ products.material_id.measurement_unit }}
                  </template>
                </Table>
              </div>
            </div>
            <div v-else-if="currentTab == 1">
              <VCardText>
                <div class="packaging">
                  <div class="d-flex justify-content-between">
                    Damaged Goods
                    <VSpacer />
                  </div>
                  <Table
                    :table-header="packagingHeaders"
                    :table-data="productsData[1]?.damaged_materials"
                    :is-loading="productstLoading"
                  >
                    <template #cell-product="{ row: products }">
                      {{ products }}
                    </template>
                    <template #cell-yield="{ row: products }">
                      {{ products }}
                    </template>
                  </Table>
                </div>
              </VCardText>
            </div>
            <div v-else-if="currentTab == 2">
              <VCardText>
                <div class="packaging">
                  <div class="d-flex justify-content-between">
                    Finished Goods
                    <VSpacer />
                  </div>
                  <Table
                    :table-header="packagingHeaders"
                    :table-data="productsData[1]?.finished_goods_in_inventory"
                    :is-loading="productstLoading"
                  >
                    <template #cell-product="{ row: products }">
                      {{ products }}
                    </template>
                    <template #cell-yield="{ row: products }">
                      {{ products }}
                    </template>
                  </Table>
                </div>
              </VCardText>
            </div>
            <div v-else-if="currentTab == 3">
              <VCardText class="px-15">
                <VTimeline
                  side="end"
                  align="start"
                  truncate-line="both"
                  density="compact"
                  class="v-timeline-density-compact"
                >
                  <VTimelineItem
                    dot-color="success"
                    size="x-small"
                  >
                    <!-- 👉 Header -->
                    <div class="d-flex justify-space-between">
                      <h6 class="text-base font-weight-semibold me-3">
                        Ended Production
                      </h6>
                      <span class="text-sm text-disabled">2 Day Ago</span>
                    </div>

                    <!-- 👉 Content -->
                    <p class="mb-1">
                      John Doe
                    </p>
                  </VTimelineItem>

                  <VTimelineItem
                    dot-color="warning"
                    size="x-small"
                  >
                    <!-- 👉 Header -->
                    <div class="d-flex justify-space-between">
                      <h6 class="text-base font-weight-semibold me-3">
                        Requested for Extra Materials
                      </h6>
                      <span class="text-sm text-disabled">6 Day Ago</span>
                    </div>

                    <!-- 👉 Content -->
                    <p class="mb-1">
                      <span class="me-2">Janet Doe</span>
                    </p>
                  </VTimelineItem>

                  <VTimelineItem
                    dot-color="warning"
                    size="x-small"
                  >
                    <!-- 👉 Header -->
                    <div class="d-flex justify-space-between">
                      <h6 class="text-base font-weight-semibold me-3">
                        Added Production Note
                      </h6>
                      <span class="text-sm text-disabled">10 Day Ago</span>
                    </div>

                    <!-- 👉 Content -->
                    <p class="mb-1">
                      John Doe
                    </p>
                  </VTimelineItem>
                </VTimeline>
              </VCardText>
            </div>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
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
    navActiveLink: production-tab
  </route>
