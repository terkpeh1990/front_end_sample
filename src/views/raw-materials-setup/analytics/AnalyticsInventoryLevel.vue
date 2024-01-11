<script setup>
const inventoryLevels = [
  {
    avatarIcon: 'tabler-shadow',
    title: 'Sugar',
    subtitle: 'Raw Material',
    stats: '1.2k',
    profitLoss: 4.2,
  },
  {
    avatarIcon: 'tabler-globe',
    title: 'Tomato Concentrate',
    subtitle: 'Raw Material',
    stats: '154 drums',
    profitLoss: 8.2,
  },
  {
    avatarIcon: 'tabler-mail',
    title: 'Citric Acid',
    subtitle: 'Raw Material',
    stats: '893 kg',
    profitLoss: 2.4,
  },
]
</script>

<template>
  <VCard
    title="Inventory Levels"
    subtitle="38.4k New"
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
          v-for="visit in inventoryLevels"
          :key="visit.title"
        >
          <template #prepend>
            <VAvatar
              size="34"
              color="secondary"
              variant="tonal"
              rounded
            >
              <VIcon :icon="visit.avatarIcon" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ visit.title }}
          </VListItemTitle>
          <VListItemSubtitle class="opacity-100 text-disabled">
            {{ visit.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <span class="me-2">{{ visit.stats }}</span>
              <VChip
                label
                :color="visit.profitLoss > 0 ? 'success' : 'error'"
              >
                {{ visit.profitLoss > 0 ? '+' : '' }}
                {{ visit.profitLoss }}%
              </VChip>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 19px;
}
</style>
