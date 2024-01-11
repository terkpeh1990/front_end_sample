<script setup>
import appleWatch from '@images/eCommerce/citric.png'
import iphone from '@images/eCommerce/iphone.png'
import nike from '@images/eCommerce/nike.png'
import sonyDualsense from '@images/eCommerce/sony-dualsense.png'
import amazonEchoDot from '@images/eCommerce/tomato.png'

const popularProducts = [
  {
    title: 'Kalypo Multifruta',
    subtitle: 'Item: #FXZ-4567',
    stats: '930',
  },
  {
    title: 'Frutelli 5kg',
    subtitle: 'Item: #FXZ-3456',
    stats: '72',
  },
  {
    title: 'Soda Biscuit',
    subtitle: 'Item: #FXZ-2345',
    stats: '249',
  },
  {
    title: 'Tomato Concentrate',
    subtitle: 'Item: #FXZ-8959',
    stats: '798',
  },
];
</script>

<template>
  <VCard
    title="Completed Productions"
    subtitle="Total 10.4k Productions"
    height="490"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <VBtn
          icon
          color="default"
          size="x-small"
          variant="plain"
        >
          <VIcon
            size="22"
            icon="tabler-dots-vertical"
          />

          <VMenu activator="parent">
            <VList>
              <VListItem
                v-for="(item, index) in ['Refresh', 'Download', 'View All']"
                :key="index"
                :value="index"
              >
                <VListItemTitle>{{ item }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VBtn>
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="product in popularProducts"
          :key="product.title"
        >
          <template #prepend>
            <VIcon
              color="primary"
              size="44"
              rounded
              icon="tabler-package"
            />
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ product.title }}
          </VListItemTitle>
          <VListItemSubtitle>
            {{ product.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <span class="font-weight-medium text-medium-emphasis me-2">{{ product.stats }}</span>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 29px;
}
</style>
