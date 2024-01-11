<script setup>
import {  } from '@/stores';
import {

  requiredValidator,
} from '@validators';


const props = defineProps({
  data: { type: Object, default: () => {} },
})




const isFormValid = ref(false)

const refForm = ref()
const loading= ref(false)

const role = ref({
  roleName: '',
})



const closeNavigationDrawer = () => {
  emit('update:isOpen', false)

  // nextTick(() => {
  //   refForm.value?.reset()
  //   refForm.value?.resetValidation()
  // })
}

const onSubmit = async data => {
  refForm.value?.validate().then( async ({ valid }) => {
    if (valid) {
      console.log(data)
    }
  })
};
</script>



<template>
  <VCardText>
    <VForm
      ref="refForm"
      v-model="isFormValid"
      @submit.prevent="() => {}"
    >
      <p class=" text-center text-lg font-weight-semibold text-capitalize mb-4">
        Create a new Role
      </p>
     
      <VCol cols="12">
        <VTextField
          v-model="role.roleName"
          :rules="[requiredValidator]"
          label="Enter Role Name"
        />
      </VCol>
                
      <VCol cols="12">
        <VBtn
          block
          :loading="loading"
          variant="tonal"
          type="submit"
          @click="onSubmit"
        >
          Submit
        </VBtn>
      </VCol>
    </VForm>
  </VCardText>
</template>



