<script>
import {
  emailValidator,
  requiredValidator,
} from '@validators'

const isFormValid = ref(false)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
})

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}
</script>

<template>
  <VForm
    ref="refForm"
    v-model="isFormValid"
    @submit.prevent="onSubmit"
  >
    <div class="__invite_form mt-5">
      <div class="__inivte_title text-center">
        <VCardTitle>Invite Admin</VCardTitle>
        <VCardSubtitle>Enter details to send invite</VCardSubtitle>
      </div>
      <VRow>
        <VCol cols="6">
          <VTextField
            v-model="formData.firstName"
            :rules="[requiredValidator]"
            label="Enter First Name"
          />
        </VCol>
        <VCol cols="6">
          <VTextField
            v-model="formData.lastName"
            :rules="[requiredValidator]"
            label="Enter Last Name"
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="formData.email"
            :rules="[requiredValidator, emailValidator]"
            label="Enter Email"
          />
        </VCol>
      </VRow>
    </div>
  </VForm>
</template>

<style>
.__invite_form {
  margin-block: 0;
  margin-inline: 8em;
}

.__inivte_title {
  margin-block-end: 3em;
}
</style>
