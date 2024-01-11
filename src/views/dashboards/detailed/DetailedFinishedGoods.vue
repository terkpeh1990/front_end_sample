<script setup>
const searchQuery = ref('')
const selectedStatus = ref()
const rowPerPage = ref(7)
const currentPage = ref(1)
const totalInvoices = ref(0)

const invoices = ref([
  { id: 'Fizz buzz',
    goodStatus: 'Success',
    balance: 'Some description',
    finishedDate: '2023-02-10',
    category: 'beverage',
    total: '5000',
  },
  { 
    id: 'Fizz drink',
    goodStatus: 'Draft',
    balance: 'Some description will show here',
    finishedDate: '2023-02-10',
  },
  { 
    id: 'Fizz drink',
    goodStatus: 'Draft',
    balance: 'Some description will show here',
    finishedDate: '2023-02-10',
  },
  { 
    id: 'Fizz drink',
    goodStatus: 'Draft',
    balance: 'Some description will show here',
    finishedDate: '2023-02-10',
  },
  { 
    id: 'Fizz drink',
    goodStatus: 'Draft',
    balance: 'Some description will show here',
    finishedDate: '2023-02-10',
  },
  { 
    id: 'Fizz drink',
    goodStatus: 'Draft',
    balance: 'Some description will show here',
    finishedDate: '2023-02-10',
  },
])
</script>

<template>
  <VCard
    v-if="invoices"
    id="invoice-list"
    height="500"
  >
    <VCardText class="d-flex align-center flex-wrap gap-2 py-4">
      <!-- 👉 Create invoice -->
      <VBtn
        :to="{ name: ''}"
      >
        Finished Goods
      </VBtn>
      
      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-2">
        <div class="invoice-list-status">
          <VSelect
            v-model="selectedStatus"
            label="Select Status"
            clearable
            clear-icon="tabler-x"
            density="compact"
            :items="['Downloaded', 'Draft', 'Paid', 'Partial Payment', 'Past Due']"
          />
        </div>
      </div>
    </VCardText>

    <VDivider />

    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead>
        <tr>
          <th
            scope="col"
            class="font-weight-semibold"
          >
            Goods Name
          </th>
          <th
            scope="col"
            class="font-weight-semibold"
          >
            Category
          </th>
          <th
            scope="col"
            class="text-center font-weight-semibold"
          >
            STOCK
          </th>
          <th
            scope="col"
            class="text-center font-weight-semibold"
          >
            COMPLETED DATE
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
            <RouterLink :to="{ name: ''}">
              #{{ invoice.id }}
            </RouterLink>
          </td>

          <!-- 👉 category -->
          <td>
            {{ invoice.category }}
          </td>

          <!-- 👉 total -->
          <td class="text-center text-medium-emphasis">
            {{ invoice.total }} K
          </td>

          <!-- 👉 Date -->
          <td class="text-center text-medium-emphasis">
            {{ invoice.finishedDate }}
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
  </VCard>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-status {
    inline-size: 11rem;
  }

  .invoice-list-search {
    inline-size: 12rem;
  }
}
</style>
