<script setup>
import { formatDate, formatDateToYearShort } from '@/@core/utils/formatters';
import CardAddApprovedQty from '@/@core/components/CardAddApprovedQty.vue';
import { useRestockStore } from '@/stores';
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';
import { themeConfig } from '@themeConfig';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const store = useRestockStore()
const consignmentDetails = ref([])
const loading = ref(true)
const message = inject('showToaster')

const restockInfo = ref({})
const otherInfo = ref({})
const isConfirmRejectDialogOpen = ref(false)

const isApproveQtyDialogVisible = ref(false)

const triggerDialog = async ({ val, refetch }) => {
  console.log('act', val, refetch)

  isApproveQtyDialogVisible.value = val
  if (refetch) {
    await fetchSingleStock()
  }
}

const rejectStock = async id => {
  const res = await store.rejectStock(id)

  if (res.status === 200) {
    message('Successfully rejected stock', 'success')
    await fetchSingleStock()
  }else {
    message('Failed to reject stock', 'error')
  }}

const fetchSingleStock = async () => {
  const res = await store.fetchSingleStock(route.params.id)

  if (res.status === 200) {
    const { consignment_details, restock_info, ...other } = res.data

    consignmentDetails.value = consignment_details
    restockInfo.value = restock_info
    otherInfo.value = other
    loading.value = false
  }
}

watchEffect(fetchSingleStock)

// 👉 Print Invoice
const printInvoice = () => {
  window.print()
}

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
    variant: 'secondary',
    icon: 'tabler-x',
  }
}
</script>

<template>
  <div>
    <section v-if="restockInfo">
      <VRow>
        <VCol
          cols="12"
          class="d-print-none d-flex justify-between"
        >
          <div class="float-right">
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
          <VSpacer />
          <div class="float-right">
            <VBtn
              prepend-icon="tabler-dots-vertical"
              variant="outlined"
              color="primary"
              class="mb-2 mx-3"
            >
              More Action
        
              <VMenu activator="parent">
                <VList>
                  <VListItem
                    v-if="otherInfo.status.toLowerCase() === 'pending'"
                    @click="isApproveQtyDialogVisible = true"
                  >
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-check"
                      />
                    </template>
          
                    <VListItemTitle>Approve Stock</VListItemTitle>
                  </VListItem>
                  <VListItem
                    v-if="otherInfo.status.toLowerCase() === 'pending'"
                    @click="isConfirmRejectDialogOpen = true"
                  >
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-x"
                      />
                    </template>
          
                    <VListItemTitle>Reject Stock</VListItemTitle>
                  </VListItem>
                  <VListItem v-if="otherInfo.status.toLowerCase() === 'pending'">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-pencil"
                      />
                    </template>
          
                    <VListItemTitle>Modify Stock</VListItemTitle>
                  </VListItem>
                  <VDivider />
                  <VListItem @click="printInvoice">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-printer"
                      />
                    </template>
        
                    <VListItemTitle>Print</VListItemTitle>
                  </VListItem>
                  <VListItem>
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-download"
                      />
                    </template>
        
                    <VListItemTitle>Download</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </div>
        </VCol>
        <VRow class="mx-auto justify-center">
          <VCol
            cols="12"
            class="print_view"
          >
            <VCard>
              <!-- SECTION Header -->
              <VCardText class="d-flex flex-wrap justify-center flex-column flex-sm-row print-row">
                <!-- 👉 Left Content -->
                <div class="ma-sm-4 text-center">
                  <!-- 👉 Address -->
                  <h1>{{ restockInfo.supplier?.name }}</h1>
                  <p class="mb-0 text-center">
                    {{ restockInfo.supplier?.address?.street }}, {{ restockInfo.supplier?.address?.city }}
                  </p>
                  <p class="mb-0">
                    {{ restockInfo.supplier?.phone_number }}
                  </p>
                </div>
              </VCardText>
              <!-- !SECTION -->
    
              <VDivider />
              <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
                <div class="mt-4 ma-sm-4">
                  <!-- 👉 Invoice ID -->
                  <h6 class="font-weight-medium text-xl mb-6">
                    Waybill Number #{{ restockInfo.waybillNumber }}
                  </h6>
    
                  <!-- 👉 Issue Date -->
                  <p class="mb-2">
                    <span>Date Issued: </span>
                    <span class="font-weight-semibold">{{ formatDate(otherInfo.created_at ) }}</span>
                  </p>
                  <p class="mb-2">
                    <span>Driver Name: </span>
                    <span class="font-weight-semibold">{{ restockInfo.driverName }}</span>
                  </p>
                  <p class="mb-2">
                    <span>Stock Status: </span>
                    <VChip
                      label
                      :color="resolveDataStatusVariant(otherInfo.status).variant"
                    >
                      {{ otherInfo.status }}
                    </VChip>
                  </p>
                </div>
              </VCardText>
    
              <!-- 👉 Table -->
              <VDivider />
              <VCardText>
                <VTable>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="text-center"
                      >
                        BRAND
                      </th>
                      <th scope="col">
                        RAW MATERIAL
                      </th>
                      <th
                        scope="col"
                        class="text-center"
                      >
                        BATCH NUMBER
                      </th>
                      <th
                        scope="col"
                        class="text-center"
                      >
                        QTY
                      </th>
                      <th
                        scope="col"
                        class="text-center"
                      >
                        APPROVED QTY
                      </th>
                      <th scope="col">
                        EXPIRY DATE
                      </th>
                    </tr>
                  </thead>
    
                  <tbody>
                    <tr
                      v-for="item in consignmentDetails"
                      :key="item.batchNumber"
                    >
                      <td class="text-center">
                        {{ item.brand_name === "" ? 'N/A' : item.brand_name }}
                      </td>
                      <td class="text-no-wrap">
                        {{ item.name }}
                      </td>
                      <td class="text-center">
                        {{ item.batchNumber }}
                      </td>
                      <td class="text-center">
                        {{ item.quantity ? item.quantity.toLocaleString('en-US') : 'N/A' }}
                      </td>
                      <td class="text-center">
                        {{ item.approved_quantity ? item.approved_quantity.toLocaleString('en-US') : 'N/A' }}
                      </td>
                      <td class="text-no-wrap">
                        {{ formatDateToYearShort(item.expiring_date) }}
                      </td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardText>
    
              <VDivider />
              <VCardText>
                <div class="d-flex mx-sm-4">
                  <div class="left">
                    <h6 class="text-sm font-weight-semibold me-1">
                      Warehouse Manager
                    </h6>
                    <p>Name Here</p>
                  </div>
                  <VSpacer />
                  <div class="right">
                    <h6 class="text-sm font-weight-semibold me-1">
                      Approved By:
                    </h6>
                    <p>Name Here</p>
                  </div>
                </div>
              </VCardText>
              <VDivider />
            </VCard>
          </VCol>
        </VRow>
      </VRow>
      <template v-if="consignmentDetails.length">
        <CardAddApprovedQty
          :data="consignmentDetails"
          :is-dialog-visible="isApproveQtyDialogVisible"
          @update:is-dialog-visible="triggerDialog"
        />
      </template>
    </section>
    <ConfirmDialog
      v-model:isDialogVisible="isConfirmRejectDialogOpen"
      confirmation-msg="Are you sure you want to reject this stock?"
      @confirm="(isConfirmed) => {
        if (isConfirmed) {
          rejectStock(route.params.id)
        }
      }"
    />
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: materials-tab
</route>

<style lang="scss">
@media print {
  .v-application {
    background: none !important;
  }

  @page { margin: 0; size: auto; }

  .layout-page-content,
  .v-row,
  .v-col-md-9 {
    padding: 0;
    margin: 0;
  }

  .product-buy-now {
    display: none;
  }

  .v-navigation-drawer,
  .layout-vertical-nav,
  .app-customizer-toggler,
  .layout-footer,
  .layout-navbar,
  .layout-navbar-and-nav-container {
    display: none;
  }

  .v-card {
    box-shadow: none !important;

    .print-row {
      flex-direction: row !important;
    }
  }

  .layout-content-wrapper {
    padding-inline-start: 0 !important;
  }
}
</style>
