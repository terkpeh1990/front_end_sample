
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
      <h4>Company Address</h4>
      <small>Provide your Company Address Details</small>
    </VCardText>
    <VTextField v-model="formData.address.country" class="mt-5" label="country" :rules="[requiredValidator]" />
    <VTextField v-model="formData.address.state" class="mt-5" label="State" :rules="[requiredValidator]" />
    <VTextField v-model="formData.address.city" class="mt-5" label="City" :rules="[requiredValidator]" />
    <VTextField v-model="formData.address.street" class="mt-5" label="Street" :rules="[requiredValidator]" />
    <VTextField v-model="formData.address.zip" class="mt-5" label="Zip" :rules="[requiredValidator]" />
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
