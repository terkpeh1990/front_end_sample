<script setup>
import { getUser } from '@/@core/services/JwtService';
import DashStatistics from '@/views/dashboards/cards/DashStatistics.vue'
import DetailedPopularProducts from '@/views/dashboards/detailed/DetailedPopularProducts.vue';
import DetailedRawMaterialsReport from '@/views/dashboards/detailed/DetailedRawMaterialsReport.vue';
import AdminDashboard from "@/views/admin/dashboard/Dashboard.vue"


const getTime = () => {
  const time = new Date().getHours()
  if (time <= 11) {
    return 'morning'
  }
  if (time >= 12 && time <= 16) {
    return 'afternoon'
  }

  return 'evening'
}

const authUser = ref(getUser())
</script>

<template>
  <div>
    <h2 class="mb-5">
      Good {{ getTime() }}, {{ authUser.first_name }} !
    </h2>
    <template v-if="authUser?.subdomain !== 'velma.cloud'">
      <VRow>
        <VCol cols="12">
          <DashStatistics />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="16" lg="8">
          <DetailedRawMaterialsReport />
        </VCol>
        <VCol>
          <DetailedPopularProducts />
        </VCol>
      </VRow>
    </template>
    <template v-else>
      <AdminDashboard />
    </template>
  </div>
</template>
  