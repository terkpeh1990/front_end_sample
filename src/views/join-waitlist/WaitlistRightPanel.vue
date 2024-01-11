<template>
  <VCard class="left-panel rounded-0 px-8 py-10 mb-6" min-height="200">
    <VBtn block class="rounded-0">
      Apply to join waitlist
    </VBtn>
    <VDivider class="mt-4 mb-8" />
    <VCardText class="pa-0 d-flex gap-2">
      <VChip color="primary" class="rounded-0">
        <VIcon icon="tabler-brand-facebook" />
      </VChip>
      <VChip color="primary" class="rounded-0">
        <VIcon icon="tabler-brand-twitter" />
      </VChip>
      <VChip color="primary" class="rounded-0">
        <VIcon icon="tabler-brand-instagram" />
      </VChip>
    </VCardText>
  </VCard>
  <VCardText class="py-4 px-6">
    <p class="text-base text-disabled mb-0">
      Department
    </p>
    <p class="text-lg mb-0">
      Production Management
    </p>
    <VDivider class="mt-4 mb-2" />
    <p class="text-base text-disabled mb-0">
      Wailist Period
    </p>
    <p class="text-lg mb-0">
      7 - 14 Bussiness days
    </p>
    <VDivider class="mt-4 mb-2" />
  </VCardText>
</template>

<style lang="scss" scoped>
.left-panel {
  box-shadow: 0 10px 0 0 rgb(var(--v-theme-primary));
}
</style>
