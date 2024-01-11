<script setup>
const router = useRouter();

const search = ref('');

const redirectToSearchedPage = () => {
  router.push({ name : `traceability-preview-id`, params: { id: search.value } })
}
</script>

<template>
  <VCard
    class="d-flex justify-center items-center"
    min-height="calc(100vh - 180px)"
  >
    <div class="search__wrapper max-w-md">
      <VCardTitle class="text-center">
        What data are you looking for?
      </VCardTitle>
      <VCardSubtitle class="text-center">
        Provide a search keyword to search for something specific.
      </VCardSubtitle>
      <VTextField
        v-model="search"
        density="default"
        class="email-search px-1 flex-grow-1"
        prepend-inner-icon="tabler-search"
        placeholder="Search keyword"
      />
      <div class="d-flex justify-center items-center cursor-pointer">
        <VBtn
          :disabled="!search.length"
          type="button"
          color="info"
          variant="flat"
          size="large"
          @click="redirectToSearchedPage"
        >
          Search
        </VBtn>
      </div>
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.search__wrapper {
  display: grid;
  gap: 8px;
  place-content: center;
}
</style>
