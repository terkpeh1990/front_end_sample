<script setup>
import { avatarText } from '@core/utils/formatters'


const searchQuery = ref('')
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalInvoices = ref(0)

const invoices = ref([
  {
    id: 1,
    issuedDate: '20-3-2023',
    total: '200',
    balance: '400',
    invoiceStatus: 'overdue',
    avatar: [],
    client: {
      name: 'John test',
    },
  },
])

const selectedRows = ref([])

// 👉 Fetch Invoices

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = invoices.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = invoices.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalInvoices.value } entries`
})

// 👉 Invoice balance variant resolver
const resolveStatus = status => {
  if (status === 'overdue')
    return {
      status: status,
      chip: { color: 'warning' },
    }
  
  return {
    status: status,
    chip: { variant: 'text' },
  }
}
</script>

<template>
  <VCard
    v-if="invoices"
    id="invoice-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-3">
      <!-- 👉 Create invoice -->
      <p
        class="me-3 text-h6"
      >
        Billing History
      </p>

      <VSpacer />
    </VCardText>

    <VDivider />
    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead>
        <tr>
          <th scope="col">
            #ID
          </th>
          <th scope="col">
            ISSUED DATE
          </th>
          <th scope="col">
            AMOUNT
          </th>
          <th scope="col">
            STATUS
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="invoice in invoices"
          :key="invoice.id"
        >
          <!-- 👉 Id -->
          <td>
            <p>
              #{{ invoice.id }}
            </p>
          </td>

          <!-- 👉 Client Avatar and Email -->
          <td>
            {{ invoice.issuedDate }}
          </td>

          <!-- 👉 total -->
          <td>${{ invoice.total }}</td>

          <!-- 👉 Date -->
          <td>
            <VChip :color="resolveStatus(invoice.invoiceStatus).chip.color">
              {{ resolveStatus(invoice.invoiceStatus).status }}
            </VChip>
          </td>
        </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="!invoices.length">
        <tr>
          <td
            colspan="8"
            class="text-center text-body-1"
          >
            No data available
          </td>
        </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-4">
      <!-- 👉  Pagination meta -->
      <span class="text-sm text-disabled">{{ paginationData }}</span>

      <!-- 👉 Pagination -->
      <VPagination
        v-model="currentPage"
        size="small"
        :total-visible="5"
        :length="totalPage"
        @next="selectedRows = []"
        @prev="selectedRows = []"
      />
    </VCardText>
  <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-status {
    inline-size: 15rem;
  }

  .invoice-list-search {
    inline-size: 12rem;
  }
}
</style>
