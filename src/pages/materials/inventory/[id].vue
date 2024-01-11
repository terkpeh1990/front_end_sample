<script setup>
import { useInventoryStore } from '@/stores'
import InventoryDetailGraph from '@/views/raw-materials-setup/cards/InventoryDetailGraph.vue';
import Table from '@/pages/components/table.vue';
import { formatDate } from '@/@core/utils/formatters';


const { fetchInventory, fetchInventoryAvailableQuantity } = useInventoryStore()
const route = useRoute()
const router = useRouter()

const tableData = ref([])
const metaData = ref({})
const isLoading = ref(true)
const isGraphLoading = ref(true)
const availableQty = ref()

const fetchAvailable = async () => {
  isGraphLoading.value = true

  const res = await fetchInventoryAvailableQuantity(route.params.id)

  availableQty.value = res.data.avialable_quantity
  isGraphLoading.value = false
}


const fetchInventoryDetails = async () => {
  const res = await fetchInventory({ id: route.params.id })
  const { data, ...rest } = res.data

  tableData.value = data
  metaData.value = rest
  isLoading.value = false
}

const statisticsVerticalSimple = ref([
  {
    title: '_',
    color: '',
    stats: '',
    icon: '',
  },
  {
    title: '__',
    color: '',
    stats: '',
    icon: '',
  },
  {
    title: '___',
    color: '',
    stats: '',
    icon: '',
  },
])

const tableHeader = [
  {
    id: 0,
    name: 'Batch Number',
    key: 'batch',
  },
  {
    id: 1,
    name: 'Quantity Intake',
    key: 'intake',
  },
  {
    id: 2,
    name: 'Available Qty',
    key: 'available',
  },
  {
    id: 4,
    name: 'Requested Qty',
    key: 'request',
  },
  {
    id: 2,
    name: 'Date Received',
    key: 'received',
  },
  {
    id: 3,
    name: 'Expiry Date',
    key: 'expiry',
  },
];

watchEffect(() => fetchInventoryDetails())

watchEffect(() => fetchAvailable())
</script>

<template>
  <div>
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
        <div class="float-right d-flex flex mx-3">
          <h2>{{ tableData[0]?.material_id?.name }} Details</h2>
        </div>
        <VSpacer />
      </VCol>
    </VRow>
    <VRow>
      <template v-if="!isLoading">
        <VCol
          md="2"
          cols="12"
        >
          <CardStatisticsVerticalSimple
            v-bind="{
              title: 'Requested Quantity',
              color: 'success',
              stats: `${tableData[0].quantity_requested.toLocaleString('en-US')} ${tableData[0].material_id.measurement_unit}`,
              icon: 'tabler-message-dots',
            }"
          />
        </VCol>
        <VCol
          md="2"
          cols="12"
        >
          <CardStatisticsVerticalSimple
            v-bind="{
              title: 'Restock Level',
              color: 'error',
              stats: `${tableData[0].material_id.restock_level.toLocaleString('en-US')} ${tableData[0].material_id.measurement_unit}`,
              icon: 'tabler-message-dots',
            }"
          />
        </VCol>
        <VCol
          md="2"
          cols="12"
        >
          <CardStatisticsVerticalSimple
            v-if="!isGraphLoading"
            v-bind="{
              title: 'Available Quantity',
              color: 'secondary',
              stats: `${availableQty?.toLocaleString('en-US')} ${tableData[0].material_id.measurement_unit}`,
              icon: 'tabler-message-dots',
            }"
          />
        </VCol>
        <VCol
          md="2"
          cols="12"
        >
          <CardStatisticsVerticalSimple
            v-bind="{
              title: 'New Intake',
              color: 'warning',
              stats: `${tableData[tableData.length - 1].quantity_intake.toLocaleString('en-US')} ${tableData[0].material_id.measurement_unit}`,
              icon: 'tabler-message-dots',
            }"
          />
        </VCol>
      </template>
      <template v-else>
        <VCol
          v-for="statistic in statisticsVerticalSimple"
          :key="statistic.name"
          md="2"
          cols="12"
        >
          <CardStatisticsVerticalSimple v-bind="statistic" />
        </VCol>
      </template>
    </VRow>
    <VRow>
      <VCol cols="4">
        <VCard :loading="isLoading">
          <VCardText v-if="!isLoading">
            <InventoryDetailGraph :data="tableData[0]" />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="8">
        <VCard>
          <VCardText>
            <VCardTitle>
              {{ tableData[0]?.material_id?.name }}
            </VCardTitle>
            <Table
              :table-data="tableData"
              :table-header="tableHeader"
              :is-loading="isLoading"
              :meta-data="metaData"
            >
              <template #cell-batch="{ row: item }">
                {{ item.batch_number }}
              </template>
              <template #cell-intake="{ row: item }">
                {{ item.quantity_intake.toLocaleString('en-US') }} {{ item.material_id.measurement_unit }}
              </template>
              <template #cell-available="{ row: item }">
                {{ item.avialable_quantity.toLocaleString('en-US') }} {{ item.material_id.measurement_unit }}
              </template>
              <template #cell-request="{ row: item }">
                {{ item.quantity_requested.toLocaleString('en-US') }} {{ item.material_id.measurement_unit }}
              </template>
              <template #cell-received="{ row: item }">
                {{ formatDate(item.date_received) }}
              </template>
              <template #cell-expiry="{ row: item }">
                {{ formatDate(item.expiring_date) }}
              </template>
            </Table>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<route lang="yaml">
  meta:
    navActiveLink: materials-tab
  </route>
