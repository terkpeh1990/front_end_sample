<script setup>
import { startCase } from 'lodash';
import { formatDate } from '@/@core/utils/formatters';
import CompanyLeftPanel from "@/views/system-settings/company-info-client/CompanyLeftPanel.vue";
import CompanyDetailsForm from "./CompanyDetailsForm.vue"

const props = defineProps({
  companyData: {
    type: Object,
    default: () => { },
  },
  loading: {
    type: Boolean,
    default: false,
  },
  waitlist: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['addUser', 'pageChange', 'editCompany', 'deactivateCompany'])

const activeTab = ref('details');

const companyData = computed(() => {
  return props.companyData
})

const loading = computed(() => props.loading)
const EXCLUDE = ['id', 'contact_person', 'address', 'schema_name']
const address = computed(() => companyData.value.address)
const contact = computed(() => companyData.value.contact_person)

console.log(companyData)

function formatValue(key, val) {
  if (key === 'created_at') {
    return formatDate(val)
  } else {
    return val
  }
}

const tabs = [
  {
    title: 'Details',
    tab: 'details',
    icon: 'tabler-link',
  },
];
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
          <CompanyDetailsForm :company-data="companyData" :loading="loading" :waitlist="props.waitlist" />
        </template>
        <template v-if="activeTab === 'stats'" />
      </VCard>
    </VCol>
  </VRow>
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


