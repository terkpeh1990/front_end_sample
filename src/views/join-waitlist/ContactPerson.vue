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
      <h4>Contact Person</h4>
      <small>Provide your Company Contact Person</small>
    </VCardText>

    <VTextField v-model="formData.contact_person.name" :rules="[requiredValidator]" label="Enter Full Name"
      class="mt-5" />
    <VTextField v-model="formData.contact_person.position" :rules="[requiredValidator]" label="Position" class="mt-5" />
    <VTextField v-model="formData.contact_person.email" :rules="[requiredValidator]" label="Enter Email Address"
      class="mt-5" />
    <VTextField v-model="formData.contact_person.phone_number" :rules="[requiredValidator]" label="Enter Phone Number"
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

