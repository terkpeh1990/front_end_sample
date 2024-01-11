<script setup>
const store = [
  {
    id: '1D904',
    name: 'Cheese puffs',
    status: 'Paid',
    inStock: '300',
    totalProduced: '400',
    prodDate: '2023-02-02',
    expDate: '2025-02-02',
    avatar: ['', ''],
    rawMaterials: ['vinegar', 'salt', 'sugar', 'dairy'],
    client: {
      name: 'Adam Smith',
      companyEmail: 'adams@gmail.com',
    },
  },
  {
    id: '1DL40',
    name: 'Cheese puffs',
    status: 'Paid',
    inStock: '300',
    totalProduced: '400',
    prodDate: '2023-02-02',
    expDate: '2025-02-02',
    avatar: ['', ''],
    rawMaterials: ['vinegar', 'salt', 'sugar', 'dairy'],
    client: {
      name: 'Eve Smith',
      companyEmail: 'adams@gmail.com',
    },
  },
]

const searchQuery = ref('')
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalInvoices = ref(0)
const invoices = ref(store);
const selectedRows = ref([])



// 👉 Computing pagination data
// const paginationData = computed(() => {
//   const firstIndex = store.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
//   const lastIndex = store.length + (currentPage.value - 1) * rowPerPage.value
  
//   return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalInvoices.value } entries`
// })

const paginationData = `Showing ${ 1 } to ${ 5 } of ${ 100 } entries`;

// 👉 Invoice balance variant resolver
const resolveInvoiceBalanceVariant = (balance, total) => {
  if (balance === total)
    return {
      status: 'Unpaid',
      chip: { color: 'error' },
    }
  if (balance === 0)
    return {
      status: 'Paid',
      chip: { color: 'success' },
    }
  
  return {
    status: balance,
    chip: { variant: 'text' },
  }
}

const resolveInvoiceStatusVariantAndIcon = status => {
  if (status === 'Partial Payment')
    return {
      variant: 'success',
      icon: 'tabler-circle-half-2',
    }
  if (status === 'Paid')
    return {
      variant: 'warning',
      icon: 'tabler-chart-pie',
    }
  if (status === 'Downloaded')
    return {
      variant: 'info',
      icon: 'tabler-arrow-down-circle',
    }
  if (status === 'Draft')
    return {
      variant: 'primary',
      icon: 'tabler-device-floppy',
    }
  if (status === 'Sent')
    return {
      variant: 'secondary',
      icon: 'tabler-circle-check',
    }
  if (status === 'Past Due')
    return {
      variant: 'error',
      icon: 'tabler-alert-circle',
    }
  
  return {
    variant: 'secondary',
    icon: 'tabler-x',
  }
}
</script>

<template>
  <VCard
    v-if="invoices"
    id="invoice-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-4">
      <!-- 👉 Rows per page -->
      <div
        class="d-flex align-center"
        style="width: 135px;"
      >
        <span class="text-no-wrap me-3">Show:</span>
        <VSelect
          v-model="rowPerPage"
          density="compact"
          :items="[10, 20, 30, 50]"
        />
      </div>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Search  -->
        <div class="invoice-list-filter">
          <VTextField
            v-model="searchQuery"
            placeholder="Search Item"
            density="compact"
          />
        </div>

        <!-- 👉 Select status -->
        <div class="invoice-list-filter">
          <VSelect
            v-model="selectedStatus"
            label="Select Status"
            clearable
            clear-icon="tabler-x"
            single-line
            :items="['Downloaded', 'Draft', 'Sent', 'Paid', 'Partial Payment', 'Past Due']"
          />
        </div>
      </div>
    </VCardText>

    <VDivider />

    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead class="text-uppercase">
        <tr>
          <th scope="col">
            #ID
          </th>
          <th
            scope="col"
            class="text-center"
          >
            DETAILS
          </th>

          <th scope="col">
            QA MANAGER(S)
          </th>

          <th
            scope="col"
            class="text-center"
          >
            TOTAL
          </th>

          <th scope="col">
            Issued Date
          </th>

          <th
            scope="col"
            class="text-center"
          >
            IN STOCK
          </th>

          <th scope="col">
            ACTIONS
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="invoice in invoices"
          :key="invoice.id"
          style="height: 3.75rem;"
        >
          <!-- 👉 Id -->
          <td>
            <RouterLink :to="{ name: 'traceability-preview-id', params: { id: invoice.id } }">
              #{{ invoice.id }}
            </RouterLink>
          </td>

          <!-- 👉 Trending -->
          <td class="text-center">
            <VTooltip>
              <template #activator="{ props }">
                <VAvatar
                  :size="30"
                  v-bind="props"
                  :color="resolveInvoiceStatusVariantAndIcon(invoice.status).variant"
                  variant="tonal"
                >
                  <VIcon
                    :size="20"
                    :icon="resolveInvoiceStatusVariantAndIcon(invoice.status).icon"
                  />
                </VAvatar>
              </template>

              <p class="mb-0">
                {{ invoice.invoiceStatus }}
              </p>
              <p class="mb-0">
                Produced Date: {{ invoice.prodDate }}
              </p>
              <p class="mb-0">
                Expiration Date: {{ invoice.expDate }}
              </p>
              <p class="mb-0">
                Raw Materials: {{ invoice.rawMaterials.join(', ') }}
              </p>
            </VTooltip>
          </td>

          <!-- 👉 Client Avatar and Email -->
          <td>
            <div class="d-flex align-center">
              <VAvatar
                size="30"
                :color="resolveInvoiceStatusVariantAndIcon(invoice.status).variant"
                variant="tonal"
                class="me-3"
              >
                <VImg
                  v-if="invoice.avatar.length"
                  :src="invoice.avatar"
                />
                <span v-else>{{ avatarText(invoice.client.name) }}</span>
              </VAvatar>

              <div class="d-flex flex-column">
                <h6 class="text-base font-weight-medium mb-0">
                  {{ invoice.client.name }}
                </h6>
                <span class="text-disabled text-sm">{{ invoice.client.companyEmail }}</span>
              </div>
            </div>
          </td>

          <!-- 👉 total -->
          <td class="text-center">
            {{ invoice.totalProduced }} K
          </td>

          <!-- 👉 Date -->
          <td>{{ invoice.prodDate }}</td>

          <!-- 👉 In Stock -->
          <td class="text-center">
            <VChip
              label
              v-bind="resolveInvoiceBalanceVariant(invoice.inStock, invoice.totalProduced).chip"
              size="small"
            >
              {{ resolveInvoiceBalanceVariant(invoice.inStock, invoice.totalProduced).status }}
            </VChip>
          </td>

          <!-- 👉 Actions -->
          <td style="width: 8rem;">
            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
            >
              <VIcon
                icon="tabler-mail"
                :size="22"
              />
            </VBtn>

            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
              :to="{ name: 'traceability-preview-id', params: { id: invoice.id } }"
            >
              <VIcon
                :size="22"
                icon="tabler-eye"
              />
            </VBtn>

            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
            >
              <VIcon
                :size="22"
                icon="tabler-dots-vertical"
              />

              <VMenu activator="parent">
                <VList>
                  <VListItem :to="{ name: 'traceability-edit-id', params: { id: invoice.id } }">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-pencil"
                      />
                    </template>

                    <VListItemTitle>View</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
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
    <VCardText class="d-flex align-center flex-wrap gap-4 py-3">
      <!-- 👉 Pagination meta -->
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VSpacer />

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
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>
