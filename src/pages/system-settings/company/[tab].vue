<script setup>
import { useRoute } from 'vue-router'
import RawMaterials from '@/views/raw-materials-setup/RawMaterials.vue'
import PackagingMaterials from '@/views/raw-materials-setup/Requests.vue'



const route = useRoute()
const activeTab = ref(route.params.tab)


// tabs
const tabs = [
  {
    title: 'Company Details',
    icon: 'tabler-users',
    tab: 'details',
  },
  {
    title: 'Admin Management',
    icon: 'tabler-lock',
    tab: 'admin-management',
  },
]
</script>

<template>
  <div>
    <VTabs v-model="activeTab">
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab"
        :to="{ name: 'materials-tab', params: { tab: item.tab } }">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow v-model="activeTab" class="mt-6 disable-tab-transition" :touch="false">
      <VWindowItem value="details">
        <RawMaterials />
      </VWindowItem>

      <VWindowItem value="admin-management">
        <PackagingMaterials />
      </VWindowItem>
    </VWindow>
    <AddCompanyDrawer v-model:isDrawerOpen="isAddCompanyDrawerVisible" @company-data="addCompany" />
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: materials-tab
</route>
