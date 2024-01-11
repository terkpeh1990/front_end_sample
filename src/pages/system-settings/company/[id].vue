<script setup>
import avatar1 from '@images/_logo_velma.png'
import router from '@/router';
import { useCompanyStore } from '@/stores';
import { formatDate } from '@/@core/utils/formatters'
import CompanyUsersList from "@/views/admin/companies/CompanyUsersList.vue";
import CompanyDetails from "@/views/admin/companies/CompanyDetails.vue"
import AddNewUserDrawer from '@/views/system-settings/AddNewUserDrawer.vue'
import AddCompanyDrawer from '@/views/system-settings/AddNewCompanyDrawer.vue'

const emit = defineEmits(['addUser', 'pageChange', 'editCompany', 'deactivateCompany'])
const store = useCompanyStore()

const route = useRoute()
const avatarImg = ref(avatar1)
const companyData = ref({})
const loading = ref(true)
const activeTab = ref(0);

const isAddNewUserDrawerVisible = ref(false)
const isAddCompanyDrawerVisible = ref(false)


const fetchCompany = async () => {
  loading.value = true;

  const res = await store.fetchSingleCompany(route.params.id)

  if (res.status === 200) {
    companyData.value = res.data

    loading.value = false
  }
}

watchEffect(fetchCompany)

const tabs = [
  {
    title: "company Information",
    tab: "0",
    access: "velma",
  },
  {
    title: "users",
    tab: "1",
    access: "velma",
  },
  {
    title: "billing",
    tab: "2",
    access: "velma",
  },
  {
    title: "support",
    tab: "3",
    access: "velma",
  },
];
</script>

<template>
  <VCard class="pa-8">
    <VCardTitle class="mx-0 pa-0">
      <VCardText class="d-flex justify-between pa-0">
        <div class="pa-0">
          <VBtn
            prepend-icon="tabler-arrow-left"
            variant="tonal"
            color="secondary"
            class="mb-2 mx-3"
            @click="router.go(-1)"
          >
            back
          </VBtn>
        </div>
        <VSpacer />
        <div class="pa-0">
          <small>Added on {{ formatDate(companyData.created_at) }}</small>
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
                  v-if="companyData.status"
                  @click="isAddCompanyDrawerVisible = true"
                >
                  <template #prepend>
                    <VIcon
                      size="24"
                      class="me-3"
                      icon="tabler-pencil"
                    />
                  </template>
      
                  <VListItemTitle>Edit Company</VListItemTitle>
                </VListItem>
                <VListItem
                  v-if="companyData.status"
                  @click="isAddNewUserDrawerVisible = true"
                >
                  <template #prepend>
                    <VIcon
                      size="24"
                      class="me-3"
                      icon="tabler-plus"
                    />
                  </template>
      
                  <VListItemTitle>Add User</VListItemTitle>
                </VListItem>
                <VListItem>
                  <template #prepend>
                    <VIcon
                      size="24"
                      class="me-3"
                      icon="tabler-message"
                    />
                  </template>
      
                  <VListItemTitle>Send Message</VListItemTitle>
                </VListItem>
      
                <VListItem v-if="companyData.status">
                  <template #prepend>
                    <VIcon
                      size="24"
                      class="me-3"
                      icon="tabler-x"
                    />
                  </template>
      
                  <VListItemTitle>Suspend Company</VListItemTitle>
                </VListItem>
                <VListItem v-if="!companyData.status">
                  <template #prepend>
                    <VIcon
                      size="24"
                      class="me-3"
                      icon="tabler-x"
                    />
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
      <template
        v-for="item in tabs"
        :key="item.title"
      >
        <VTab :value="item.tab">
          {{ item.title }}
        </VTab>
      </template>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <VWindowItem value="0">
        <CompanyDetails
          :company-data="companyData"
          :loading="loading"
        />
      </VWindowItem>
      <VWindowItem value="1">
        <CompanyUsersList />
      </VWindowItem>
    </VWindow>

    <!-- <InviteUserDrawer :is-open="isInviteUserDrawerOpen" /> -->
  </VCard>
  <AddNewUserDrawer
    v-model:isDrawerOpen="isAddNewUserDrawerVisible"
    :data="companyData"
  />
  <AddCompanyDrawer
      v-model:isDrawerOpen="isAddCompanyDrawerVisible"
      :company-data="companyData"
      @edit-company="fetchCompany"
    />
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


