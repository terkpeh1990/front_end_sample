<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

const props = defineProps({
  toggle: {
    type: Function,
    default: () => { },
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const company = {
  id: '1',
  title: 'Admin Panel - How To Get Started Tutorial Create easy customizable applications',
  description: 'Been afraid to step away been focused on from v4 to v5 speaker approachable making focused a but from a step away afraid to step away been focused Writing a blog post is a little like driving; you can study the highway code (or read articles telling you how to write a blog post) for months, but nothing can prepare you for the real thing like getting behind the wheel',
};
</script>

<template>
  <VDialog max-width="600" :model-value="props.isVisible" max-height="auto" :fullscreen="$vuetify.display.width < 600"
    class="d-flex justify-center" @update:model-value="props.toggle">
    <PerfectScrollbar :options="{ wheelPropagation: false, suppressScrollX: true }" class="h-100">
      <VCard title="">
        <VCardText>
          <h4 class="text-center text-primary" color="primary">
            {{ company.title }}
          </h4>
        </VCardText>
        <VCardText>
          <p>{{ company.description }}</p>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VDialog>
</template>
