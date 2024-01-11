<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <VListItem>
    <VListItemTitle>
      <h6 class="text-base font-weight-semibold">
        {{ props.label }}:
        <span class="text-body-2">
          <slot />
        </span>
      </h6>
    </VListItemTitle>
  </VListItem>
</template>
