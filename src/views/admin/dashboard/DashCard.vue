<script setup>
const props = defineProps({
  cardData: {
    type: Object,
    default: () => { },
  },
});

const cardItem = computed(() => {
  return props.cardData
});

const keys = {
  "Total Companies": ['Active', 'Inactive'],
  "Upcoming Payments": ['Upcoming', 'Overdue'],
  "WaitListed Companies": ['New', 'Old'],
  "Number of Tickets": ['New Tickets', 'Overdue'],
};
</script>

<template>
  <VCard class="cursor-pointer">
    <VCardText>
      <h6 class="text-lg font-weight-bold">
        {{ cardItem.title }}
      </h6>
      <div>
        <h6 class="text-sm font-weight-semibold">
          {{ cardItem.stats }}
        </h6>
      </div>

      <div class="d-flex gap-2 text-sm text-disabled mt-6">
        <VChip label color="success">
          {{ cardItem.active }} {{ `${keys[cardItem.title][0]}` }}
        </VChip>
        <VChip label color="error">
          {{ cardItem.inactive }} {{ `${keys[cardItem.title][1]}` }}
        </VChip>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.v-card {
  &:hover {
    background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
    transform: scale(1.05);
  }
}
</style>
