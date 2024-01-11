<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import countries from '@/@core/data/countries-states-cities.json';
import { industries } from '@/@core/data/industry';
import {
  emailValidator,
  requiredValidator,
} from '@validators';
import { useAdminStore } from '@/stores';

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  companyData: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'companyData',
  'editCompany',
])

const store = useAdminStore()
const message = inject('showToaster')

const isFormValid = ref(false)
const isEditing = ref(false)

const refForm = ref()
const isOpen = computed(() => props.isDrawerOpen)
const companyEditData = computed(() => props.companyData)

const drawerOpen = ref(false)

watch(isOpen, newVal => {
  drawerOpen.value = newVal
})

const loading = ref(false);

const formData = ref({
  name: 'Gyata cement',
  size: '0-49',
  industry: 'Builders/General Contractors',
  status: 'Pending',
  address: {
    phone_number: '',
    email: '',
    street: '',
    state: '',
    country: '',
    city: '',
  },
  contact_person: {
    name: '',
    phone_number: '',
    email: '',
    position: '',
  },
})

watch(companyEditData, newVal => {
  formData.value = { ...formData.value, ...newVal }
  isEditing.value = true
})

const subDomain = ref ('')

// const sub_domains = computed(() => `${formData.value.name.replace(' ', '').toLowerCase()}`)
const baseUrl = ref(localStorage.getItem('baseUrl'))


const _countries = computed(() => Object.keys(countries)) ?? []
const states = ref([])
const cities = ref([])

watch(formData, (newVal, oldVal) => {

  if(newVal?.address?.country) {
    states.value = Object.keys(countries[newVal.address.country].states)
  }

  if(newVal?.address?.state) {
    cities.value = countries[newVal.address.country]["states"][newVal.address.state]
  }

  if (newVal?.name) {
    subDomain.value = newVal.name.replaceAll(' ', '').toLowerCase()
  }

  if (newVal?.name === '') {
    subDomain.value = ''
  }

}, { deep: true })

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    isEditing.value = false
    subDomain.value = ''
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

// const updateCompany = () => {
//   refForm.value?.validate().then( async ({ valid }) => {
//     if (valid) {
//       try {
//         loadings.value[0] = true

//         const { schema_name, sub_domains, created_at, status, ...rest } = formData.value

//         const response = await store.updateCompany({ ...rest })

//         if(response && response.status === 200) {
//           loadings.value[0] = false
//           emit('editCompany')
//           message('Company successfully updated', 'success')
//           closeNavigationDrawer()
//         }else {
//           message('Company could not be updated', 'error')
//         }
//       } catch(err) {
//         loadings.value[0] = false
//         message('Company could not be updated', 'error')
//       }
//     }
//   })};



const onSubmit = async () => {
  refForm.value?.validate().then( async ({ valid }) => {
    if (valid) {
      try {
        loading.value = true;

        const schema_name = formData.value.name.replaceAll(' ', '_').toLowerCase();
        const sub_domains = `${subDomain.value}.${baseUrl.value}`;

        const toSend = { ...formData.value, schema_name, sub_domains };

        const response = await store.createWaitlist({ payload: toSend })

        if([200, 201].includes(response.status)) {
          loading.value = false
          message('Company successfully created', 'success')

          closeNavigationDrawer()
        } else {
          loading.value = false
          message('Failed to add company', 'error')
        }
      } catch(err) {
        loading.value = false
        message('Failed to add company', 'error')
      }
    }
  })};
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="1000"
    location="end"
    class="scrollable-content"
    :model-value="drawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <div class="d-flex align-center pa-6 pb-1">
      <h6
        v-if="!isEditing"
        class="text-h6"
      >
        Company Onboarding
      </h6>
      <h6
        v-else
        class="text-h6"
      >
        Edit Company
      </h6>

      <VSpacer />

      <div class="d-flex text-center">
        <VBtn
          variant="text"
          @click="closeNavigationDrawer"
        >
          Cancel
        </VBtn>
        <VBtn
          v-if="!isEditing"
          :loading="loading"
          variant="tonal"
          type="submit"
          @click="onSubmit"
        >
          Submit
        </VBtn>
        <VBtn
          v-else
          variant="tonal"
          @click="() => {}"
        >
          Update
        </VBtn>
      </div>
    </div>
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VDivider />
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="() => {}"
          >
            <VRow>
              <div class="d-flex w-100 align-center">
                <VCol
                  cols="4"
                  class="d-none d-md-flex d-lg-flex"
                >
                  <VCardText>
                    <h4>Company Name</h4>
                    <small>Enter the name of your Business or Organization</small>
                  </VCardText>
                </VCol>
                <VCol
                  cols="12"
                  md="8"
                >
                  <VTextField
                    v-model="formData.name"
                    :rules="[requiredValidator]"
                    label="Enter Name"
                  />
                </VCol>
              </div>
              <div class="d-flex w-100 align-center">
                <VCol
                  cols="4"
                  class="d-none d-md-flex d-lg-flex"
                >
                  <VCardText>
                    <h4>Company Details</h4>
                    <small>Provide your Company Details</small>
                  </VCardText>
                </VCol>
                <VCol
                  cols="12"
                  md="8"
                >
                  <VRow>
                    <VCol cols="6">
                      <VSelect
                        v-model="formData.size"
                        :rules="[requiredValidator]"
                        label="Enter Size"
                        :items="['0-49', '50-99', '100-200', '300-400', '500-600', '700-800', '900-1000']"
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
                  </VRow>
                </VCol>
              </div>
              <div class="d-flex w-100 align-center mt-5">
                <VCol
                  cols="4"
                  class="d-none d-md-flex d-lg-flex"
                >
                  <VCardText>
                    <h4>Company Address</h4>
                    <small>Add your Organization's Address(es)</small>
                  </VCardText>
                </VCol>
                <VCol
                  cols="12"
                  md="8"
                >
                  <VRow>
                    <VCol cols="6">
                      <VTextField
                        v-model="formData.address.street"
                        :rules="[requiredValidator]"
                        label="Enter Address"
                      />
                    </VCol>
                    <VCol cols="6">
                      <VTextField
                        v-model="formData.address.phone_number"
                        :rules="[requiredValidator]"
                        label="Phone Number"
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
                    <VCol cols="6">
                      <VTextField
                        v-model="formData.email"
                        label="Enter Email"
                        :rules="[requiredValidator, emailValidator]"
                      />
                    </VCol>
                  </VRow>
                </VCol>
              </div>
              <div class="d-flex w-100 align-center mt-5">
                <VCol
                  cols="4"
                  class="d-none d-md-flex d-lg-flex"
                >
                  <VCardText>
                    <h4>Contact Person</h4>
                    <small>Add your organiation contact person</small>
                  </VCardText>
                </VCol>
                <VCol
                  cols="12"
                  md="8"
                >
                  <VRow class="mt-5">
                    <VCol cols="6">
                      <VTextField
                        v-model="formData.contact_person.name"
                        :rules="[requiredValidator]"
                        label="Enter Full Name"
                      />
                    </VCol>
                    <VCol cols="6">
                      <VTextField
                        v-model="formData.contact_person.position"
                        :rules="[requiredValidator]"
                        label="Position"
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
              <div
                v-if="!isEditing"
                class="d-flex w-100 align-center mt-5"
              >
                <VCol
                  cols="4"
                  class="d-none d-md-flex d-lg-flex"
                >
                  <VCardText>
                    <h4>Dedicated Domain</h4>
                    <small>System URL for your organization</small>
                  </VCardText>
                </VCol>
                <VCol
                  cols="12"
                  md="8"
                >
                  <VRow class="mt-5">
                    <VCol cols="8">
                      <VTextField
                        v-model="subDomain"
                        :disabled="isEditing"
                        :rules="[requiredValidator]"
                        label="Domain Name"
                      />
                    </VCol>
                    <VCol cols="4">
                      .{{ baseUrl }}
                    </VCol>
                  </VRow>
                </VCol>
              </div>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
