<script setup>
import illustration from "@/assets/images/illustrations/20.png"
import SupportFaqs from "@/views/support/FAQs.vue";
import SupportTutorial from "@/views/support/Tutorial.vue";
import SupportTicket from "@/views/support/Ticket.vue";
import SupportOverview from "@/views/support/Overview.vue";

const search = ref('');
const currentTab = ref('');
</script>

<template>
  <VCard class="" height="100%" width="100%">
    <VCardText>
      <VRow class="row">
        <VCol col="12" class="h-full">
          <VCardTitle class="pa-0 my-2">
            How can we help you?
          </VCardTitle>
          <div class="search__wrapper max-w-md">
            <VTextField v-model="search" density="default" class="search-input" prepend-inner-icon="tabler-search"
              placeholder="Ask a question" />
          </div>
        </VCol>
        <VCol col="12" md="6">
          <div class="misc-avatar w-100">
            <VImg :src="illustration" alt="Illustration Soon" :max-width="263" class="mx-auto" />
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText class="tabs-wrap">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab>
          Overview
        </VTab>
        <VTab>Tickets</VTab>
        <VTab>Tutorials</VTab>
        <VTab>FAQs</VTab>
      </VTabs>
    </VCardText>
  </VCard>
  <VCard class="my-8" min-height="500">
    <VWindow v-model="currentTab" class="mt-5">
      <VWindowItem>
        <SupportOverview />
      </VWindowItem>
      <VWindowItem>
        <SupportTicket />
      </VWindowItem>
      <VWindowItem>
        <SupportTutorial />
      </VWindowItem>
      <VWindowItem>
        <SupportFaqs />
      </VWindowItem>
    </VWindow>
  </VCard>
</template>

<style lang="scss" scoped>
.row {
  // border: 1px solid red;
}

.h-full {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.search-input {
  // width: 400px;
}

.tabs-wrap {
  // background: rgba(var(--v-theme-on-background));
}
</style>
