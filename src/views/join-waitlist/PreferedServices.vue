<script setup>
import { requiredValidator } from "@/@core/utils/validators";

const props = defineProps({
  formData: {
    type: Object,
    default: () => { },
  },
});

const formData = computed(() => {
  return props.formData
});
</script>

<template>
  <div class="form-wrap">
    <VCardText class="pa-0">
      <h4>Prefered Features</h4>
      <small>Provide your Company's Prefered Features</small>
    </VCardText>
    <VCheckbox v-model="formData.features" value="production" class="mt-5" label="Production" />
    <VCheckbox v-model="formData.features" value="qa" class="mt-5" label="Quality Control" />
    <VCheckbox v-model="formData.features" value="inventory" class="mt-5" label="Inventory" />
    <VCheckbox v-model="formData.features" value="sales" class="mt-5" label="Sales" />
  </div>
</template>

<style lang="scss" scoped>
.form-wrap {
  padding-bottom: 2rem;
}

@media screen and (min-width: 600px) {
  .form-wrap {
    padding-bottom: 0;
  }
}
</style>

