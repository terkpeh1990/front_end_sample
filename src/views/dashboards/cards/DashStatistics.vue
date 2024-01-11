<script setup>
import { formatDate } from '@/@core/utils/formatters';

const statistics = [
  {
    title: 'Sales',
    stats: '230',
    icon: 'tabler-chart-pie-2',
    color: 'success',
    prev: '120',
  },
  {
    title: 'Finished Goods',
    stats: '849',
    icon: 'tabler-users',
    color: 'error',
    prev: '569',
  },
  {
    title: 'New Products',
    stats: '423',
    icon: 'tabler-shopping-cart',
    color: 'error',
    prev: '320',
  },
  {
    title: 'Revenue',
    stats: '975',
    icon: 'tabler-currency-dollar',
    color: 'success',
    prev: '1205',
  },
]

const refetchData = hideOverlay => {
  setTimeout(hideOverlay, 3000)
}
</script>

<template>
  <AppCardActions title="Overview" action-refresh @refresh="refetchData">
    <template #append>
      <span class="cursor-pointer">
        <VIcon class="text-body-2" icon="tabler-refresh" size="24" />
      </span>
      <span class="text-body-2 mx-2">Last updated {{ formatDate(Date.now()) }}</span>
    </template>

    <VCardText class="pt-6">
      <VRow>
        <VCol v-for="item in statistics" :key="item.title" cols="6" md="3">
          <div class="wrapper">
            <div class="d-flex">
              <VAvatar color="secondary" variant="tonal" size="42" class="me-3">
                <VIcon size="24" :icon="item.icon" />
              </VAvatar>

              <div class="d-flex flex-column">
                <div class="d-flex flex-column my-2">
                  <span class="font-weight-medium">{{ item.title }}</span>
                </div>
                <div class="d-flex my-2">
                  <span class="text-h5 font-weight-bold">
                    {{ item.stats }}
                  </span>
                  <span class="mx-2">
                    <VChip label :color="item.color">
                      + 20%
                    </VChip>
                  </span>
                </div>
                <div class="d-flex flex-column my-1">
                  <span class="font-weight-regular">vs Last month {{ item.prev.toLocaleString('en-US') }}</span>
                </div>
              </div>
            </div>
            <VDivider color="secondary" length="100" vertical />
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </AppCardActions>
</template>
