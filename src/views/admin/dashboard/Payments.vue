<!-- eslint-disable import/no-unresolved -->
<script setup>
import { avatarText, formatDate, getRandomColor } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';
import { Payments } from "./data";
import { useCompanyStore } from "@/stores";
import Loader from "@/pages/components/Loader.vue";
import { useRouter } from 'vue-router';

const props = defineProps({});

const emit = defineEmits([, 'pageChange', 'editCompany', 'deactivateCompany'])
const router = useRouter()
const store = useCompanyStore();

const page = ref(0);
const search = ref('');

const loading = ref(false)

const waitlistCompanies = ref([
  {
    name: 'Joy Daddy and Sons',
    companyName: "billing@joy.com",
    status: 'overdue',
    date: '20-04-23',
  },
  {
    name: 'Malos Brewery',
    companyName: "malo@brew.com",
    status: 'pending',
    date: '25-04-23',
  },
])

const meta = ref({})
const isFetchingCompany = ref(false);

const fetchCompanies = async (page = 1, search = '') => {
}

watchEffect(() => fetchCompanies(1, ""));


const fetchPageData = page => {
  emit('pageChange', page)
}

const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'overdue')
    return 'error'

  return 'primary'
};
</script>

<template>
  <VCard height="100%">
    <VCardText class="d-flex items-center justify-space-between px-0">
      <VCardTitle>Payments</VCardTitle>
      <VBtn variant="text" class="view-all-btn text-capitalize"
        @click.prevent="() => router.push({ name: 'accounting' })">
        View all
      </VBtn>
    </VCardText>
    <VCardText class="pa-1">
      <div v-if="isFetchingCompany" class="empty_state mt-10 mb-10">
        <Loader />
      </div>
      <template v-else>
        <VTable hover class="text-no-wrap">
          <!-- 👉 table head -->
          <thead>
            <tr>
              <th v-for="head in Payments" :key="head.id" scope="col">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <!-- 👉 table body -->
          <tbody>
            <tr v-for="(company, index) in waitlistCompanies" :key="company.id" style="height: 3.75rem;" class=""
              @click.prevent="() => router.push({ name: '', params: { id: company.id } })">
              <td>{{ index + 1 }}</td>
              <!-- 👉 company -->
              <td>
                <div class="d-flex flex-column">
                  <span>{{ `${company.name}` }}</span>
                  <span class="text-sm text-disabled">{{ company.companyName }}</span>
                </div>
              </td>
              <td>
                <VChip label :color="resolveUserStatusVariant(company.status)" size="small" class="text-capitalize">
                  {{ company.status }}
                </VChip>
              </td>
              <td>
                {{ `${company.date}` }}
              </td>
            </tr>
          </tbody>

          <!-- 👉 table footer  -->
          <tfoot v-show="!waitlistCompanies?.length">
            <tr>
              <td colspan="7" class="text-center">
                No data available
              </td>
            </tr>
          </tfoot>
        </VTable>
      </template>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.view-all-btn {
  margin-right: 16px;
}
</style>
