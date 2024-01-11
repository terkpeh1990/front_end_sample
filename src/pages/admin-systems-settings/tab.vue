<script setup>
import AddAdminDrawer from "@/views/admin/systems-settings/AddAdminDrawer.vue";
import AddRoleDrawer from "@/views/admin/systems-settings/AddRolesDrawer.vue";
import Search from "@/pages/components/Search.vue";
import { useAdminStore } from "@/stores";
import { watchEffect } from "vue";
import UsersList from "@/views/admin/systems-settings/UsersList.vue"
import RolesPermission from "@/views/admin/systems-settings/rolesPermissions.vue"

const { getAdminsList } = useAdminStore();
const activeTab = ref(0);
const isFetchingCompany = ref(false);
const isAddCompanyDrawerVisible = ref(false);
const isAddRoleDrawerVisible = ref(false);
const search = ref()

const userList = ref()
const metaData = ref()
const loading = ref(false)

async function fetchAdmin(page = 1, search = "") {
  loading.value = true;
  try {
    const result = await getAdminsList(page, search)
    const { data, ...rest } = result.data;

    userList.value = data;
    metaData.value = rest;
  } catch (error) {
    return error
  } finally {
    loading.value = false;
  }
}

watchEffect(() => fetchAdmin(1, ""))


// tabs
const tabs = [
  {
    title: "User Management",
    tab: "0",
    access: "velma",
  },

  {
    title: "Roles and Permissions",
    tab: "1",
    access: "velma",
  },
];

function openModal() {
  isAddRoleDrawerVisible.value = !isAddRoleDrawerVisible.value
}

const searchAdmin = searchQuery => {
  isFetchingCompany.value = true;
  fetchAdmin(1, searchQuery);
  isFetchingCompany.value = false;
};

const defaultDomain = ref(import.meta.env.VITE_DEFAULT_SUBDOMAIN);
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
            <Search :loading="isFetchingCompany" @search-query="searchAdmin" />
            <VSpacer />
            <VBtn prepend-icon="tabler-plus" @click="isAddCompanyDrawerVisible = true">
              Add User
            </VBtn>
          </div>
          <UsersList :user-list="userList" :meta-data="metaData" :loading="loading" @page="(page) => fetchAdmin(page)" />
        </VCard>
      </VWindowItem>
      <VWindowItem value="1">
        <VCard class="px-0 py-0">
          <RolesPermission :open-modal="openModal" />
        </VCard>
      </VWindowItem>
    </VWindow>

    <AddRoleDrawer v-model:isDrawerOpen="isAddRoleDrawerVisible" />
    <AddAdminDrawer v-model:isDrawerOpen="isAddCompanyDrawerVisible" />
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: admin-systems-settings-tab
</route>
