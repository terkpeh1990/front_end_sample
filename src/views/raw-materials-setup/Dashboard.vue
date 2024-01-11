<script setup>
import DashCardFinishedGoods from '@/views/dashboards/cards/DashCardFinishedGoods.vue';
import DashCardRawMaterials from '@/views/dashboards/cards/DashCardRawMaterials.vue';
import AnalyticsInventoryLevel from './analytics/AnalyticsInventoryLevel.vue';
import AnalyticsStockTracker from './analytics/AnalyticsStockTracker.vue';

const simpleStatisticsDemoCards = [
  {
    icon: 'tabler-currency-dollar',
    color: 'error',
    title: 'Raw Materials',
    subTitle: 'Last week',
    stat: '1.28k',
    change: '-12.2%',
  },
  {
    icon: 'tabler-chart-bar',
    color: 'info',
    title: 'Finished Goods',
    subTitle: 'Last week',
    stat: '$4,673',
    change: '+25.2%',
  },
]
</script>

<template>
  <div>
    <VRow>
      <VCol
        cols="12"
        md="16"
        lg="8"
      >
        <AnalyticsStockTracker />
      </VCol>
    </VRow>
    <VRow>
      <!-- 👉 Revenue Growth -->
      <VCol
        cols="12"
        md="6"
        lg="4"
      >
        <DashCardRawMaterials />
      </VCol>
      <VCol
        cols="12"
        md="6"
        lg="4"
      >
        <DashCardFinishedGoods />
      </VCol>
      <VCol
        cols="12"
        md="6"
        lg="4"
      >
        <AnalyticsInventoryLevel />
      </VCol>
    </VRow>
  </div>
</template>

