<script setup>
import Tickets from "./Ticket.vue"

const openedPanels = ref([0]);
const search = ref('');


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


const tickets = [
  {
    id: 1,
    title: 'How to use the app to manage a production',
    description: 'By Keenthemes to save tons and more to time money projects are listed amazing outstanding projects are listed',
    type: 'Production',
  },
  {
    id: 2,
    title: 'How to use traceability to find materials history',
    description: 'By Keenthemes to save tons and more to time money projects are listed amazing outstanding projects are listed',
    type: 'Traceability',
  },
];

const tutorials = [
  {
    id: '1',
    title: 'Admin Systems Setting - How To onboard other users....',
    description: 'Been afraid to step away been focused on from v4 to v5 speaker approachable making focused a but from a step away afraid to step away been focused Writing a blog post is a little like driving; you can study the highway code (or read articles telling you how to write a blog post) for months, but nothing can prepare you for the real thing like getting behind the wheel',
  },
  {
    id: '2',
    title: 'Admin Roles and Permission - How To Get Started Tutorial on managing roles....',
    description: 'We’ve been focused on making the from v4 to v5 but we have also not been afraid to step away been focused on from v4 to v5 speaker approachable making focused a but from a step away afraid to step away been focused Writing a blog post is a little like driving; you can study the highway code....',
  },
];
</script>

<template>
  <VRow>
    <VCol col="12" md="6">
      <VCardText class="px-4">
        <VCardTitle class="title px-2 font-weight-bold">
          Frequently Asked Questions
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
      </VCardText>
    </VCol>
    <VCol col="12" md="6">
      <VCardText class="px-4">
        <VCardTitle class="title px-2 font-weight-bold">
          Tickets
        </VCardTitle>

        <VCardItem v-for="ticket in tickets" :key="ticket.id" class="px-1 py-2">
          <p class="text-h6 d-flex flex justify-space-between text-primary">
            {{ ticket.title }}
            <VChip color="secondary">
              {{ ticket.type }}
            </VChip>
          </p>
          <p class="text-md">
            {{ ticket.description }}
          </p>
        </VCardItem>
      </VCardText>
    </VCol>
    <VCol col="12" md="6">
      <VCardText class="px-4">
        <VCardTitle class="title px-2 font-weight-bold">
          Tutorials
        </VCardTitle>
        <VCardItem v-for="tutorial in tutorials" :key="tutorial.id" class="px-1 py-2">
          <VCardTitle class="px-0 cursor-pointer chat-contact-header d-block text-primary text-xl font-weight-medium">
            {{ tutorial.title }}
          </VCardTitle>
          <p class="px-0">
            {{ tutorial.description }}
          </p>
        </VCardItem>
      </VCardText>
    </VCol>
    <VCol col="12" md="6">
      <VCardText class="px-4">
        <VCardTitle class="title px-2 font-weight-bold">
          Videos
        </VCardTitle>

        <VCardItem class="px-1 py-2">
          <iframe width="530" height="330" src="https://www.youtube.com/embed/TWdDZYNqlg4" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen />
        </VCardItem>
      </VCardText>
    </VCol>
  </VRow>
</template>
