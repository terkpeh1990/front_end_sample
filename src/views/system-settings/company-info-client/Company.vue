<script setup>
import { getUser } from '@/@core/services/JwtService';
import { avatarText, formatDate } from '@/@core/utils/formatters';
import { useCompanyStore } from '@/stores';
import CompanyInformation from "./CompanyInfo.vue"
import CompanyLeftPanel from './CompanyLeftPanel.vue';
import CompanyTab2Details from "./CompanyDetails.vue"

const tabs = [
  {
    title: 'Company Information',
    icon: 'tabler-use',
    tab: 'details',
  },
  {
    title: 'Customize',
    icon: 'tabler-loc',
    tab: 'stats',
  },
]

const currentUser = computed(() => getUser())

const store = useCompanyStore()

const companyData = ref({})
const loading = ref({})
const activeTab = ref('details')

const fetchCompany = async () => {
  loading.value = true;

  const id = JSON.parse(currentUser.value.company_id)
  try {
    const res = await store.fetchCompanyByID(id)

    if (res.status === 200) {
      companyData.value = res.data
    }
  } catch (error) {
    return error
  }
  loading.value = false;
}

watchEffect(fetchCompany)
</script>

<template>
  <VRow>
    <VCol cols="4">
      <CompanyLeftPanel :company-data="companyData" />
    </VCol>
    <VCol cols="8" class="right-panel overflow-auto h-500 scroll-bar">
      <VCard class="pa-4" height="auto" min-height="580">
        <VTabs class="tabs">
          <template v-for="item in tabs" :key="item.icon">
            <VTab class="px-2" :value="item.tab" @click="activeTab = item.tab">
              {{ item.title }}
            </VTab>
          </template>
        </VTabs>
        <template v-if="activeTab === 'details'">
          <CompanyInformation :company-data="companyData" :refetch="fetchCompany" :loading="loading" />
        </template>
        <template v-if="activeTab === 'stats'">
          <CompanyTab2Details :company-data="companyData" />
        </template>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.right-panel {
  max-height: 77vh;
}

.scroll-bar {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.scroll-bar::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}
</style>
