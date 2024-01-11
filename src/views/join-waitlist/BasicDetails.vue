
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
      <h4>Basic Information</h4>
      <small>Provide these basic information</small>
    </VCardText>
    <VTextarea v-model="formData.overview" rows="3" label="Tell us a little about you" :rules="[requiredValidator]"
      class="mt-5" />
    <VTextField v-model="formData.name" class="mt-5" :rules="[requiredValidator]" label="Full Name" />
    <VTextField v-model="formData.email" class="mt-5" :rules="[requiredValidator]" label="Contact Email" />
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
