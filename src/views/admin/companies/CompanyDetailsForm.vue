<script setup>
import { getUser } from '@/@core/services/JwtService';
import { useCompanyStore } from '@/stores';
import CompanyLogo from "@/views/system-settings/company-info-client/CompanyLogo.vue";
import {
  emailValidator,
  requiredValidator,
} from '@validators';

const props = defineProps({
  companyData: {
    type: Object,
    default: () => { },
  },
  refetch: {
    type: Function,
    default: () => { },
  },
  loading: {
    type: Boolean,
    default: () => { },
  },
  waitlist: {
    type: Boolean,
  },
})

const store = useCompanyStore()

const currentUser = computed(() => getUser())

const isFormValid = ref(false)

const loading = computed(() => {
  return props.loading
})

const refForm = ref()

const accountDataLocal = computed(() => {
  return props.companyData
})

console.log(accountDataLocal.value)

const message = inject('showToaster')

// async function onSubmit() {
//   loading.value = true;
//   refForm.value?.validate().then( async ({ valid }) => {
//     if (valid) {
//       const companyId =  JSON.parse(currentUser.value.company_id)
//       try {

//         const res = await store.updateCompanyDetails({ companyId: companyId, payload: accountDataLocal.value });

//         if([200, 201].includes(res.status)) {
//           message('Details updated', 'success')
//         } else {
//           message('Could not update details', 'error')
//         }
//       } catch (error) {
//         return error
//       } finally {
//         loading.value = false;
//         props.refetch
//       }
//     }})
// }
async function onSubmit() {
}
</script>

<template>
  <VCardText>
    <CompanyLogo v-if="!props.waitlist" />

    <VDivider />

    <VCardText v-if="!loading" class="pt-2">
      <!-- 👉 Form -->

      <VForm ref="refForm" v-model="isFormValid" class="mt-6" @submit.prevent="() => { }">
        <VRow>
          <!-- 👉 First Name -->
          <VCol md="6" cols="12">
            <VTextField v-model="accountDataLocal.name" label="Name" :rules="[requiredValidator]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.email" label="E-mail" type="email"
              :rules="[requiredValidator, emailValidator]" />
          </VCol>

          <!-- 👉 Phone -->
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.phone_number" label="Phone Number" />
          </VCol>

          <!-- 👉 Country -->
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.address.country" label="country" :rules="[requiredValidator]" />
          </VCol>

          <!-- 👉 State -->
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.address.state" label="State" :rules="[requiredValidator]" />
          </VCol>

          <!-- 👉 City -->
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.address.city" label="city" :rules="[requiredValidator]" />
          </VCol>
          <!-- 👉 Street -->
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.address.street" label="street" :rules="[requiredValidator]" />
          </VCol>
          <!-- 👉 Size -->
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.size" label="size" />
          </VCol>
          <!-- 👉 Employees -->
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.employeesCount" label="number of employees" type="number" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="accountDataLocal.branches" label="number of branches" type="number" />
          </VCol>
        </VRow>
        <VCardText class="pa-0">
          <p class="text-h6 pa-0 my-6">
            Contact Person
          </p>
          <VRow>
            <!-- 👉 First Name -->
            <VCol md="6" cols="12">
              <VTextField v-model="accountDataLocal.contact_person.name" label="Name" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="accountDataLocal.contact_person.email" label="E-mail" type="email"
                :rules="[requiredValidator, emailValidator]" />
            </VCol>

            <!-- 👉 Organization -->
            <VCol cols="12" md="6">
              <VTextField v-model="accountDataLocal.contact_person.position" label="Position" />
            </VCol>

            <!-- 👉 Phone -->
            <VCol cols="12" md="6">
              <VTextField v-model="accountDataLocal.contact_person.phone_number" label="Phone Number"
                :rules="[requiredValidator]" />
            </VCol>

            <!-- 👉 Form Actions -->
            <VCol cols="12" class="d-flex flex-wrap gap-4">
              <VBtn :loading="loading" type="submit" @click="onSubmit">
                Save changes
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VForm>
    </VCardText>
  </VCardText>
</template>
