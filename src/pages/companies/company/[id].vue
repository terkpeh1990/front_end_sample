<script setup>
import avatar1 from '@images/_logo_velma.png'
import router from '@/router';
import { useAdminStore } from '@/stores';
import { formatDate } from '@/@core/utils/formatters'
import CompanyDetails from "@/views/admin/companies/CompanyDetails.vue"

const emit = defineEmits(['addUser', 'pageChange', 'editCompany', 'deactivateCompany'])
const store = useAdminStore()

const route = useRoute()
const companyData = ref({})
const loading = ref(true)
const activeTab = ref(0);

const fetchCompany = async () => {
  const res = await store.getSingleWaitlistCompany(route.params.id)

  if (res.status === 200) {
    companyData.value = res.data

    loading.value = false
  }
}

function formatValue(key, val) {
  if (key === 'created_at') {
    return formatDate(val)
  } else {
    return val
  }
}

watchEffect(fetchCompany)

const tabs = [
  {
    title: "company Information",
    tab: "0",
    access: "velma",
  },
];
</script>

<template>
  <VCard class="pa-8">
    <VCardTitle class="mx-0 pa-0">
      <VCardText class="d-flex justify-between pa-0">
        <div class="pa-0">
          <VBtn prepend-icon="tabler-arrow-left" variant="tonal" color="secondary" class="mb-2 mx-3"
            @click="router.go(-1)">
            back
          </VBtn>
        </div>
        <VSpacer />
        <div class="pa-0">
          <small>Added on {{ formatDate(companyData.created_at) }}</small>
          <VBtn prepend-icon="tabler-dots-vertical" variant="outlined" color="primary" class="mb-2 mx-3">
            More Action

            <VMenu activator="parent">
              <VList>
                <VListItem v-if="companyData.status">
                  <template #prepend>
                    <VIcon size="24" class="me-3" icon="tabler-x" />
                  </template>

                  <VListItemTitle>Suspend Company</VListItemTitle>
                </VListItem>
                <VListItem v-if="!companyData.status">
                  <template #prepend>
                    <VIcon size="24" class="me-3" icon="tabler-x" />
                  </template>

                  <VListItemTitle>Activate Company</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </div>
      </VCardText>
    </VCardTitle>

    <VTabs v-model="activeTab">
      <template v-for="item in tabs" :key="item.title">
        <VTab :value="item.tab">
          {{ item.title }}
        </VTab>
      </template>
    </VTabs>

    <VWindow v-model="activeTab" class="mt-6 disable-tab-transition" :touch="false">
      <VWindowItem value="0">
        <CompanyDetails :company-data="companyData" :loading="loading" waitlist />
      </VWindowItem>
    </VWindow>
  </VCard>
</template>

<route lang="yaml">
  meta:
    navActiveLink: companies-tab
</route>

<style lang="scss" scoped>
p {
  margin-block-end: 0 !important;
}

h4 {
  margin-block-end: 0 !important;
}

.reverse-text {
  color: rgb(var(--v-theme-card-font-50)) !important;
  margin-block-end: 0 !important;
}

.custom_card {
  background-color: rgb(var(--v-theme-card-bg)) !important;
  block-size: 200px;
}

.page__wrap {
  display: grid;
  place-content: center;
}

@media print {
  .v-application {
    background: none !important;
  }

  @page {
    margin: 0;
    size: auto;
  }

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
}
</style>


