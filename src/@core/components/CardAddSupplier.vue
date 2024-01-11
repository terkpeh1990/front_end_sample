<script setup>
import { requiredValidator } from '@validators';
import { useSupplierStore } from '@/stores'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
  'supplierData',
])

const store = useSupplierStore()
const message = inject('showToaster')

const formData = ref({
  name: '',
  phone_number: '',
  address: {
    city: '',
    street: '',
    country: '',
  },
})

const refForm = ref()
const isFormValid = ref(false)

const loadings = ref([])

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const formSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if(valid) {
      try{
        loadings.value[0] = true

        const res = await store.createNewSupplier(formData.value)
        if (res.status === 201) {
          emit('supplierData')
          message('Successfully added a new supplier', 'success')
          dialogModelValueUpdate(false)
        } else {
          loadings.value[0] = false
          message('Failed to add new supplier', 'error')
        }
      }
      catch(e) {
        loadings.value[0] = false
      }
    }
  })
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 600"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-5 pa-sm-15">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 font-weight-medium mb-4">
          Add New Supplier
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-6">
        <VForm
          ref="refForm"
          v-model="isFormValid"
          @submit.prevent="formSubmit"
        >
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="formData.name"
                class="mt-5"
                :rules="[requiredValidator]"
                label="Enter Supplier Name"
              />
            </VCol>

            <VCol
              cols="12"
            >
              <VTextField
                v-model="formData.phone_number"
                class="mt-5"
                :rules="[requiredValidator]"
                label="Phone Number"
              />
            </VCol>
            <VCol
              cols="12"
            >
              <VTextField
                v-model="formData.address.country"
                class="mt-5"
                :rules="[requiredValidator]"
                label="Enter Country"
              />
            </VCol>
            <VCol
              cols="12"
            >
              <VTextField
                v-model="formData.address.city"
                class="mt-5"
                :rules="[requiredValidator]"
                label="Enter City"
              />
            </VCol>

            <VCol
              cols="12"
            >
              <VTextField
                v-model="formData.address.street"
                class="mt-5"
                :rules="[requiredValidator]"
                label="Enter Address"
              />
            </VCol>

            <VCol
              cols="12"
              class="text-center"
            >
              <VBtn
                class="me-3"
                :loading="loadings[0]"
                :disabled="isFormValid === false"
                type="submit"
              >
                Submit
              </VBtn>
              <VBtn
                color="secondary"
                variant="tonal"
                @click="$emit('update:isDialogVisible', false)"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
