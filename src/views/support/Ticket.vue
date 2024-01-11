<script setup>
const search = ref('');

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
  {
    id: 3,
    title: 'How to add a recipe for production',
    description: 'By Keenthemes to save tons and more to time money projects are listed amazing outstanding projects are listed',
    type: 'Materials',
  },
];
</script>

<template>
  <VCardText>
    <VCardTitle class="title px-4">
      Public Ticket
    </VCardTitle>
    <VCol col="12" md="8">
      <div class="my-4">
        <VTextField v-model="search" density="default" class="email-search px-1 flex-grow-1"
          prepend-inner-icon="tabler-search" placeholder="Search keyword" />
      </div>

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
    </VCol>
  </VCardText>
</template>
