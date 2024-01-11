<script setup>
import TopPanel from "./Statistics.vue";
import MiddleSection from "./BottomPanel.vue";
import DashSupport from "./DashSupport.vue";
import Payments from "./Payments.vue"
</script>

<template>
  <TopPanel />
  <MiddleSection />
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <DashSupport />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <Payments />
    </VCol>
  </VRow>
</template>


