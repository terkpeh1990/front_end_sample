<!-- eslint-disable vue/prefer-true-attribute-shorthand -->
<script setup>
const props = defineProps({
  loading: { type: Boolean, default: () => false },
  class: { type: String, default: () => 'width' },
})

const emit = defineEmits(['searchQuery'])

const searchQuery = ref('')
const isLoading = computed(() => props.loading)
let searchTimer

watch(searchQuery, (newVal, _) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    emit('searchQuery', newVal)
  }, 500)
})
</script>

<template>
  <div :class="[props.class]">
    <VTextField
      v-model="searchQuery"
      variant="outlined"
      color="primary"
      clearable
      prepend-inner-icon="tabler-search"
      placeholder="Search"
      density="compact"
      :loading="isLoading"
      search
    />
  </div>
</template>

<style>
.width {
  width: 20%;
}
.min-width {
  width: 45%;
}
</style>
