<script setup>
import { formatDate } from '@/@core/utils/formatters';
import DashboardCompanies from "./DashCompanies.vue";
import WaitList from "./WaitList.vue";
</script>

<template>
  <VRow class="pa-0">
    <VCol
      cols="12"
      md="6"
    >
      <DashboardCompanies />
    </VCol>
    <VCol
      height="100%"
      cols="12"
      md="6"
    >
      <WaitList />
    </VCol>
  </VRow>
</template>
