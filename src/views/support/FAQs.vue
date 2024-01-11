
<script setup>
const openedPanels = ref([0]);
const openedPanelsMat = ref([0]);
const openedPanelsQA = ref([]);
const openedPanelsSales = ref([]);

const faqs = [
  {
    question: ' How to a start a new production?',
    answer: 'To start a new production, you want to go click on the production tab on the sidebar menu and click on star new production....',
  },
  {
    question: ' How to a start a new production?',
    answer: 'To start a new production, you want to go click on the production tab on the sidebar menu and click on star new production....',
  },
  {
    question: ' How to a start a new production?',
    answer: 'To start a new production, you want to go click on the production tab on the sidebar menu and click on star new production....',
  },
];
</script>

<template>
  <VCardText>
    <VCardTitle class="title px-2">
      Frequently Asked Questions
    </VCardTitle>
    <VRow>
      <VCol height="500">
        <VCardTitle class="px-2 chat-contact-header d-block text-primary text-xl font-weight-medium">
          Production
        </VCardTitle>
        <VExpansionPanels v-model="openedPanels" multiple>
          <VExpansionPanel v-for="(faq, i) in faqs" :key="i">
            <VExpansionPanelTitle class="px-0">
              <template #actions />
              <div class="icon-wrap">
                <VIcon :icon="openedPanels.includes(i) ? 'tabler-minus' : 'tabler-plus'" color="success" class="" />
              </div>
              {{ faq.question }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="px-4">
              {{ faq.answer }}
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol>
        <VCardTitle class="px-2 chat-contact-header d-block text-primary text-xl font-weight-medium">
          Raw Materials
        </VCardTitle>
        <VExpansionPanels v-model="openedPanelsMat" multiple>
          <VExpansionPanel v-for="(faq, i) in faqs" :key="i">
            <VExpansionPanelTitle class="px-0">
              <template #actions />
              <div class="icon-wrap">
                <VIcon :icon="openedPanels.includes(i) ? 'tabler-minus' : 'tabler-plus'" color="success" class="" />
              </div>
              {{ faq.question }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="px-4">
              {{ faq.answer }}
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
    <VRow class="rows">
      <VCol height="500">
        <VCardTitle class="px-2 chat-contact-header d-block text-primary text-xl font-weight-medium">
          Quality Control
        </VCardTitle>
        <VExpansionPanels v-model="openedPanelsQA" multiple>
          <VExpansionPanel v-for="(faq, i) in faqs" :key="i">
            <VExpansionPanelTitle class="px-0">
              <template #actions />
              <div class="icon-wrap">
                <VIcon :icon="openedPanelsQA.includes(i) ? 'tabler-minus' : 'tabler-plus'" color="success" class="" />
              </div>
              {{ faq.question }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="px-4">
              {{ faq.answer }}
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol>
        <VCardTitle class="px-2 chat-contact-header d-block text-primary text-xl font-weight-medium">
          Sales
        </VCardTitle>
        <VExpansionPanels v-model="openedPanelsSales" multiple>
          <VExpansionPanel v-for="(faq, i) in faqs" :key="i">
            <VExpansionPanelTitle class="px-0">
              <template #actions />
              <div class="icon-wrap">
                <VIcon :icon="openedPanelsSales.includes(i) ? 'tabler-minus' : 'tabler-plus'" color="success" class="" />
              </div>
              {{ faq.question }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="px-4">
              {{ faq.answer }}
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VCardText>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 2rem;
}

.icon-wrap {
  margin-right: 0.6rem;
}

.rows {
  margin-top: 2rem;
}
</style>
