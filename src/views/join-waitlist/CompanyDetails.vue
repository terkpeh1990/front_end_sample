
<script setup>
import { requiredValidator } from "@/@core/utils/validators";
import { industries } from '@/@core/data/industry';

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
      <h4>Company Details</h4>
      <small>Provide your Company Details</small>
    </VCardText>
    <VTextField v-model="formData.company_name" class="mt-5" :rules="[requiredValidator]" label="Company Name" />
    <VAutocomplete v-model="formData.industry" :rules="[requiredValidator]" label="Select Industry" :items="industries"
      class="mt-5" />
    <VSelect v-model="formData.size" :rules="[requiredValidator]" label="Enter Size"
      :items="['0-49', '50-99', '100-200', '300-400', '500-600', '700-800', '900-1000']" class="mt-5" />
    <VTextField v-model="formData.branches" :rules="[requiredValidator]" label="Number of branches" type="number"
      class="mt-5" />
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
