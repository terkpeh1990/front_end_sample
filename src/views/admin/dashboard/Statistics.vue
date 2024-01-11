<script setup>
import { formatDate } from '@/@core/utils/formatters';
import DashboardCard from "./DashCard.vue"

const statistics = [
  {
    title: 'Total Companies',
    stats: '10',
    icon: 'tabler-users',
    color: 'success',
    active: '8',
    inactive: '2',
  },
  {
    title: 'Upcoming Payments',
    stats: '5',
    icon: 'tabler-chart-pie-2',
    color: 'success',
    active: '3',
    inactive: '2',
  },
  {
    title: 'WaitListed Companies',
    stats: '4',
    icon: 'tabler-shopping-cart',
    color: 'error',
    active: '1',
    inactive: '2',
  },
  {
    title: 'Number of Tickets',
    stats: '57',
    icon: 'tabler-currency-dollar',
    color: 'success',
    active: '8',
    inactive: '2',
  },
]

const refetchData = hideOverlay => {
  setTimeout(hideOverlay, 3000)
}
</script>

<template>
  <VCardText class="pa-0">
    <VRow>
      <VCol
        v-for="item in statistics"
        :key="item.title"
        cols="6"
        md="3"
      >
        <DashboardCard :card-data="item" />
      </VCol>
    </VRow>
  </VCardText>
</template>
