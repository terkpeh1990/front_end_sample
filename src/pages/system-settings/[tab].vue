<script setup>
import { getUser } from '@/@core/services/JwtService'
import Appearance from '@/views/system-settings/Appearance.vue'
import Company from '@/views/system-settings/Company.vue'
import AddCompanyDrawer from '@/views/system-settings/AddNewCompanyDrawer.vue'
import UserManagement from '@/views/system-settings/user-management-client/user-management.vue'
import Search from '@/pages/components/Search.vue'
import { useRoute } from 'vue-router'
import { useCompanyStore, useRoleStore } from '@/stores';
import { watchEffect } from 'vue';
import CompanyInformation from "@/views/system-settings/company-info-client/Company.vue"
import InviteUserDrawer from "@/views/system-settings/user-management-client/inviteUserDrawer.vue"
import BillingSubscription from "./billing/billing.vue"

const message = inject('showToaster')
const store = useCompanyStore()
const rolesStore = useRoleStore()
const route = useRoute()
const activeTab = ref(route.params.tab)
const toasterData = ref({})
const companies = ref([])
const companyMetaData = ref({})
const isFetchingCompany = ref(true)
const isAddCompanyDrawerVisible = ref(false)
const isInviteUserVisible = ref(false)
const roles = ref([])
const companyEditData = ref({})

const fetchCompanies = async (page = 1, search = '') => {

  try {
    isFetchingCompany.value = true
    
    const res = await store.fetchAllCompanies(page, search)

    if (res.status === 200) {
      const { data, ...rest } = res.data

      companies.value = data
      companyMetaData.value = rest
      isFetchingCompany.value = false
    }
  } catch(e) {
    isFetchingCompany.value = false
  }

}

const fetchSingleCompany = async data => {

  isAddCompanyDrawerVisible.value = true
  companyEditData.value = data

}

const changeCompanyStatus = async data => {
  const res = await store.updateCompany(data)
  if (res.status === 200) {
    message('Successfully changed company status', 'success')
    await fetchCompanies()
  }else {
    message('Failed to change company status', 'error')
  }


}

const fetchRoles = async () => {
  const res = await rolesStore.fetchRoles()

  roles.value = res.data
}

watchEffect(() => fetchCompanies(1, ''))
watchEffect(fetchRoles)

// tabs
const tabs = [
  {
    title: 'Company Information',
    icon: 'tabler-loc',
    tab: 'company-information',
    access: 'company',
  },
  {
    title: 'User Management',
    icon: 'tabler-oc',
    tab: 'user-management',
    access: 'company',
  },
  {
    title: 'Billing & subscription',
    icon: 'tabler-loc',
    tab: 'billing',
    access: 'all',
  },
  {
    title: 'Appearance',
    icon: 'tabler-loc',
    tab: 'appearance',
    access: 'all',
  },
]

const openInviteUser = ()=>{
  isInviteUserVisible.value = true
}

const defaultDomain = ref(import.meta.env.VITE_DEFAULT_SUBDOMAIN)
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
    >
      <template
        v-for="item in tabs"
        :key="item.icon"
      >
        <template v-if="defaultDomain?.toLowerCase() === getUser().subdomain && item?.access == 'velma'">
          <VTab
            :value="item.tab"
            :to="{ name: 'system-settings-tab', params: { tab: item.tab } }"
          >
            {{ item.title }}
          </VTab>
        </template>
        <template v-else-if="defaultDomain?.toLowerCase() !== getUser().subdomain && item?.access == 'company'">
          <VTab
            :value="item.tab"
            :to="{ name: 'system-settings-tab', params: { tab: item.tab } }"
          >
            {{ item.title }}
          </VTab>
        </template>
        <template v-else-if="item.access == 'all'">
          <VTab
            :value="item.tab"
            :to="{ name: 'system-settings-tab', params: { tab: item.tab } }"
          >
            {{ item.title }}
          </VTab>
        </template>
      </template>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <VWindowItem value="company-information">
        <CompanyInformation />
      </VWindowItem>
      <VWindowItem value="user-management">
        <UserManagement :open-modal="openInviteUser" />
      </VWindowItem>
      <VWindowItem value="billing">
        <BillingSubscription />
      </VWindowItem>
      <VWindowItem value="appearance">
        <Appearance />
      </VWindowItem>
    </VWindow>
    <InviteUserDrawer
      v-model:isOpen="isInviteUserVisible"
      :is-open="isInviteUserVisible"
    />
    <AddCompanyDrawer
      v-model:isDrawerOpen="isAddCompanyDrawerVisible"
    />
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: system-settings-tab
</route>
