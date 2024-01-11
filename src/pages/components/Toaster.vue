<script setup>
const props = defineProps({
  title: { type: String, default: 'Info' },
  content: { type: String, required: true },
  color: { type: String, default: () => 'primary' },
  isVisible: { type: Boolean, default: false },
})


const visible = ref(props.isVisible)
</script>

<template>
  <VSnackbar
    v-model="visible"
    :color="props.color"
    :timeout="4000"
  >
    <div class="text-subtitle-1 pb-2">
      {{ props.title }}
    </div>

    {{ props.content }}

    <template #actions>
      <VBtn
        icon="tabler-x"
        color="indigo"
        variant="text"
        @click="visible = false"
      />
    </template> 
  </VSnackbar>
</template>
