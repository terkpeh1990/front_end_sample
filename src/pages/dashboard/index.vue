<template>
  <div>
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
        <DashCardProduction />
      </VCol>
    </VRow>

    <VRow>
      <VCol
        cols="12"
        md="16"
        lg="8"
      >
        <DetailedFinishedGoods />
      </VCol>
      
      <VCol>
        <DetailedPopularProducts />
      </VCol>
    </VRow>
    <VRow>
      <VCol
        cols="12"
        md="16"
        lg="8"
      >
        <DetailedRawMaterialsReport />
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import DashCardFinishedGoods from '@/views/dashboards/cards/DashCardFinishedGoods.vue'
import DashCardProduction from '@/views/dashboards/cards/DashCardProduction.vue'
import DashCardRawMaterials from '@/views/dashboards/cards/DashCardRawMaterials.vue'
import DetailedFinishedGoods from '@/views/dashboards/detailed/DetailedFinishedGoods.vue'
import DetailedPopularProducts from '@/views/dashboards/detailed/DetailedPopularProducts.vue'
import DetailedRawMaterialsReport from '@/views/dashboards/detailed/DetailedRawMaterialsReport.vue'

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


