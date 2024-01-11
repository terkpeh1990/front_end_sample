<script setup>
const props = defineProps({
  createForm: {
    type: Function,
    default: () => {},
  },
});

const stock = ref("stock");
const mat = ref("material");
</script>

<template>
  <VRow class="ma-0 mt-10 d-flex justify-center gap-10">
    <div class="d-flex h-100 align-center justify-center flex-column">
      <VAvatar
        size="109"
        class="elevation-3 mb-6 bg-surface"
      >
        <VIcon
          size="50"
          class="rounded-0 text-high-emphasis"
          icon="tabler-coin"
        />
      </VAvatar>
      <p
        class="mb-0 px-6 py-1 font-weight-medium text-lg elevation-3 rounded-xl text-high-emphasis bg-surface cursor-pointer"
        :class="[{ 'cursor-pointer': $vuetify.display.smAndDown }]"
        @click="createForm(stock)"
      >
        Create Stock Form
      </p>
    </div>
    <div class="d-flex h-100 align-center justify-center flex-column">
      <VAvatar
        size="109"
        class="elevation-3 mb-6 bg-surface"
        hover
      >
        <VIcon
          size="50"
          class="rounded-0 text-high-emphasis"
          icon="tabler-3d-cube-sphere"
        />
      </VAvatar>
      <p
        class="mb-0 px-6 py-1 font-weight-medium text-lg elevation-3 rounded-xl text-high-emphasis bg-surface cursor-pointer"
        :class="[{ 'cursor-pointer': $vuetify.display.smAndDown }]"
        @click="createForm(mat)"
      >
        Create Raw Materials Form
      </p>
    </div>
  </VRow>
</template>
