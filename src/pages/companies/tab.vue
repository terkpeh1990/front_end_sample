<script setup>
import { getUser } from "@/@core/services/JwtService";
import Company from "@/views/system-settings/Company.vue";
import WaitlistCompanies from "@/views/admin/companies/WaitlistCompanies.vue";
import AddWaitlistCompanyDrawer from "@/views/admin/companies/AddWaitlistCompanyDrawer.vue";
import AddCompanyDrawer from "@/views/system-settings/AddNewCompanyDrawer.vue";
import Search from "@/pages/components/Search.vue";
import { useCompanyStore, useRoleStore } from "@/stores";
import { watchEffect } from "vue";

const message = inject("showToaster");
const store = useCompanyStore();
const rolesStore = useRoleStore();

const activeTab = ref(0);
const toasterData = ref({});
const companies = ref([]);
const companyMetaData = ref({});
const isFetchingCompany = ref(true);
const isAddCompanyDrawerVisible = ref(false);
const isAddWaitlistCompanyDrawerVisible = ref(false);
const roles = ref([]);
const companyEditData = ref({});


const fetchCompanies = async (page = 1, search = "") => {
  try {
    isFetchingCompany.value = true;

    const res = await store.fetchAllCompanies(page, search);

    if (res.status === 200) {
      const { data, ...rest } = res.data;

      companies.value = data;
      companyMetaData.value = rest;
      isFetchingCompany.value = false;
    }
  } catch (e) {
    isFetchingCompany.value = false;
  }
};

const fetchSingleCompany = async data => {
  isAddCompanyDrawerVisible.value = true;
  companyEditData.value = data;
};

const changeCompanyStatus = async data => {
  const res = await store.updateCompany(data);
  if (res.status === 200) {
    message("Successfully changed company status", "success");
    await fetchCompanies();
  } else {
    message("Failed to change company status", "error");
  }
};

const fetchRoles = async () => {
  const res = await rolesStore.fetchRoles();

  roles.value = res.data;
};

watchEffect(() => fetchCompanies(1, ""));
watchEffect(fetchRoles);

// tabs
const tabs = [
  {
    title: "Companies",
    tab: '0',
    access: "velma",
  },
  {
    title: "Waitlist",
    tab: '1',
    access: "velma",
  },
];

const searchCompany = searchQuery => {
  isFetchingCompany.value = true;
  fetchCompanies(1, searchQuery);
};
</script>

<template>
  <div>
    <VTabs v-model="activeTab">
      <template v-for="item in tabs" :key="item.title">
        <VTab :value="item.tab">
          {{ item.title }}
        </VTab>
      </template>
    </VTabs>

    <VWindow v-model="activeTab" class="mt-6 disable-tab-transition" :touch="false">
      <VWindowItem value="0">
        <VCard class="px-5 py-5">
          <div class="d-flex justify-content-between mb-5">
            <Search :loading="isFetchingCompany" @search-query="searchCompany" />
            <VSpacer />
            <VBtn prepend-icon="tabler-plus" @click="isAddCompanyDrawerVisible = true">
              Add Company
            </VBtn>
          </div>
          <Company :toaster-data="toasterData" :company-data="companies" :is-loading="isFetchingCompany"
            :company-meta-data="companyMetaData" @page-change="(page) => fetchCompanies(page)"
            @edit-company="fetchSingleCompany" @deactivate-company="changeCompanyStatus" />
        </VCard>
      </VWindowItem>
      <VWindowItem value="1">
        <WaitlistCompanies :open-waitlist-modal="() => isAddWaitlistCompanyDrawerVisible = true" />
      </VWindowItem>
    </VWindow>

    <AddWaitlistCompanyDrawer v-model:isDrawerOpen="isAddWaitlistCompanyDrawerVisible" />
    <AddCompanyDrawer v-model:isDrawerOpen="isAddCompanyDrawerVisible" />
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: companies-tab
</route>
