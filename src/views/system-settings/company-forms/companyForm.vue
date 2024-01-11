<script setup>
import countries from '@/@core/data/countries-states-cities.json';
import { industries } from '@/@core/data/industry';
import {
  emailValidator,
  requiredValidator,
} from '@validators';

const isFormValid = ref(false)

const refForm = ref()
const loadings = ref([])

const formData = ref({
  name: '',
  email: '',
  size: '',
  industry: '',
  phone_number: '',
  address: {
    street: '',
    state: '',
    country: '',
    city: '',
  },
  contact_person: {
    name: '',
    phone_number: '',
    email: '',
  },

})

const _countries = computed(() => Object.keys(countries))
const states = ref([])
const cities = ref([])

watch(formData, (newVal, oldVal) => {

  if(newVal.address.country) {
    states.value = Object.keys(countries[newVal.address.country].states)
  }

  if(newVal.address.state) {
    formData.value.address.city = ""
    cities.value = countries[newVal.address.country]["states"][newVal.address.state]
  }

  if (newVal.address.state !== oldVal.address.state) {
    formData.value.address.city = ""
  }

}, { deep: true })


const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('companyData', { ...formData.value })
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
    @submit.prevent="() => {}"
  >
    <VRow>
      <div class="d-flex w-100 align-center mb-5">
        <VCol cols="4">
          <VCardText>
            <h4>Company Name</h4>
            <small>Enter the name of your Business or Organization</small>
          </VCardText>
        </VCol>
        <VCol cols="8">
          <VTextField
            v-model="formData.name"
            :rules="[requiredValidator]"
            label="Enter Name"
          />
        </VCol>
      </div>
      <div class="d-flex w-100 align-center mt-5 mb-5">
        <VCol cols="4">
          <VCardText>
            <h4>Company Details</h4>
            <small>Provide your Company Details</small>
          </VCardText>
        </VCol>
        <VCol cols="8">
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="formData.email"
                label="Enter Email"
                :rules="[requiredValidator, emailValidator]"
              />
            </VCol>
            <VCol cols="6">
              <VSelect
                v-model="formData.size"
                :rules="[requiredValidator]"
                label="Enter Size"
                :items="['50-99', '100-200', '300-400', '500-600', '700-800', '900-1000']"
              />
            </VCol>
            <VCol cols="6">
              <VAutocomplete
                v-model="formData.industry"
                :rules="[requiredValidator]"
                label="Select Industry"
                :items="industries"
              />
            </VCol>
            <VCol cols="6">
              <VAutocomplete
                v-model="formData.address.country"
                :rules="[requiredValidator]"
                label="Select Country"
                :items="_countries"
              />
            </VCol>
          </VRow>
        </VCol>
      </div>
      <div class="d-flex w-100 align-center mt-5">
        <VCol cols="4">
          <VCardText>
            <h4>Company Address</h4>
            <small>Add your Organization's Address(es)</small>
          </VCardText>
        </VCol>
        <VCol cols="8">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="formData.address.street"
                :rules="[requiredValidator]"
                label="Enter Address"
              />
            </VCol>
            <VCol cols="6">
              <VAutocomplete
                v-model="formData.address.state"
                :rules="[requiredValidator]"
                label="Select State"
                :items="states"
              />
            </VCol>
            <VCol cols="6">
              <VAutocomplete
                v-model="formData.address.city"
                :rules="[requiredValidator]"
                label="Select City"
                :items="cities"
              />
            </VCol>
          </VRow>
        </VCol>
      </div>
      <div class="d-flex w-100 align-center mt-5">
        <VCol cols="4">
          <VCardText>
            <h4>Contact Person</h4>
            <small>Add your organiation contact person</small>
          </VCardText>
        </VCol>
        <VCol cols="8">
          <VRow class="mt-5">
            <VCol cols="12">
              <VTextField
                v-model="formData.contact_person.name"
                :rules="[requiredValidator]"
                label="Enter Full Name"
              />
            </VCol>
            <VCol cols="6">
              <VTextField
                v-model="formData.contact_person.email"
                :rules="[requiredValidator]"
                label="Enter Email Address"
              />
            </VCol>
            <VCol cols="6">
              <VTextField
                v-model="formData.contact_person.phone_number"
                :rules="[requiredValidator]"
                label="Enter Phone Number"
              />
            </VCol>
          </VRow>
        </VCol>
      </div>
    </VRow>
    <div class="text-center mt-12">
      <VBtn
        variant="text"
        @click="closeNavigationDrawer"
      >
        Cancel
      </VBtn>
      <VBtn
        :loading="loadings[0]"
        variant="tonal"
        type="submit"
      >
        Submit
      </VBtn>
    </div>
  </VForm>
</template>
