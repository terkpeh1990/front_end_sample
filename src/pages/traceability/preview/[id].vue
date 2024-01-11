<script setup>
const searchResult = [
  {
    id: 1,
    title: 'Hot Cheetos: sweet, sour, bland',
    description: 'This is a very hot cheetos currently in demand by our users. With the hot flavour',
    createdBy: 'Sam Smith',
    createdAt: '2023-02-02',
    quantity: "1.4k",
  },
  {
    id: 2,
    title: 'Fizzy fun',
    description: 'This is a very hot cheetos currently in demand by our users. With the hot flavour',
    createdBy: 'Sam Smith',
    createdAt: '2023-02-02',
  },
  {
    id: 3,
    title: 'Corn syrup',
    description: 'This is a very hot cheetos currently in demand by our users. With the hot flavour',
    createdBy: 'Sam Smith',
    createdAt: '2023-02-02',
  },
  {
    id: 4,
    title: 'Hot Cheetos',
    description: 'This is a very hot cheetos currently in demand by our users. With the hot flavour',
    createdBy: 'Sam Smith',
    createdAt: '2023-02-02',
  },
];
</script>

<template>
  <VCard>
    <VCardText class="wrap">
      <div
        v-for="search in searchResult"
        :key="search.title"
        class="mb-5"
      >
        <RouterLink
          :to="{ name: 'traceability-preview-view-id', params: { id: search.id } }"
          class="d-flex align-center"
        >
          <h4 class="text-base green x-small cursor-pointer text-underline font-weight-semibold me-1 mb-1">
            {{ search.title }}
          </h4>
          <VIcon
            color="success"
            icon="tabler-link"
            size="14"
            class="me-1"
          />
        </RouterLink>
       
        <p class="text-base font-weight-semibold me-1 mb-1">
          {{ search.description }}
        </p>
        <div class="d-flex gap-2 items-center">
          <VChip
            color="default"
            outlined="info"
            size="small"
            label
          >
            {{ search.createdBy }}
          </VChip>
          <p class=" small text-base font-weight-semibold me-1 mb-1">
            {{ search.quantity }}
          </p>
          <p class=" small text-base font-weight-semibold me-1 mb-1">
            {{ search.createdAt }}
          </p>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" src="./style.scss" scoped>
</style>
