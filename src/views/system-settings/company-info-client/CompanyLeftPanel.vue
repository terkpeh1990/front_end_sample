<script setup>
import { avatarText, formatDate } from '@/@core/utils/formatters';
import ListItem from "./ListItem.vue"

const props = defineProps({
  companyData: {
    type: Object,
    default: () => { },
  },
})

const companyData = computed(() => {
  return props.companyData
})
</script>

<template>
  <VCard class="" min-height="76vh">
    <VCardText class="text-center pt-15">
      <!-- 👉 Avatar -->
      <VAvatar rounded :size="120" color="primary" variant="tonal">
        <VImg v-if="companyData.avatar" :src="companyData.avatar" />
        <span v-else class="text-5xl font-weight-semibold">
          {{ avatarText(companyData.name) }}
        </span>
      </VAvatar>

      <!-- 👉 User fullName -->
      <h6 class="text-h6 mt-4">
        {{ companyData.name }}
      </h6>
    </VCardText>
    <VCardText class="d-flex flex-wrap mt-3">
      <!-- 👉 Done task -->
      <div class="d-flex align-center me-8 mb-2">
        <VAvatar :size="38" rounded color="primary" variant="tonal" class="me-3">
          <VIcon size="24" icon="tabler-checkbox" />
        </VAvatar>

        <div>
          <h6 class="text-base font-weight-semibold">
            {{ companyData.size }}
          </h6>
          <span class="text-sm">Size</span>
        </div>
      </div>

      <!-- 👉 Done Project -->
      <div class="d-flex align-center me-4 mb-2">
        <VAvatar :size="38" rounded color="primary" variant="tonal" class="me-3">
          <VIcon size="24" icon="tabler-briefcase" />
        </VAvatar>

        <div>
          <h6 class="text-base font-weight-semibold">
            {{ companyData.industry }}
          </h6>
          <span class="text-sm">Industry</span>
        </div>
      </div>
    </VCardText>

    <VDivider />

    <!-- 👉 Details -->
    <VCardText class="align-center">
      <p class="text-sm text-uppercase text-disabled">
        Details
      </p>

      <!-- 👉 User Details list -->

      <VList class="card-list mt-2">
        <ListItem label="Name">
          {{ companyData.name }}
        </ListItem>
        <ListItem label="Email">
          {{ companyData.email }}
        </ListItem>
        <ListItem label="Date Joined">
          {{ formatDate(companyData.created_at) }}
        </ListItem>
        <ListItem label="Contact">
          {{ companyData.phone_number || 'N/A' }}
        </ListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
