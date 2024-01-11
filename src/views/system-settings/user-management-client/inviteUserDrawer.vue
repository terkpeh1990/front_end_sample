<script setup>
import { useCompanyStore, useRoleStore } from '@/stores';
import {
  emailValidator,
  requiredValidator,
} from '@validators';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { getUser } from '@/@core/services/JwtService';
import { useRolesComposable } from '@/@core/composable/useFetchRoles';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  data: { type: Object, default: () => { } },
})

const emit = defineEmits([
  'update:isOpen',
])


const currentUser = computed(() => getUser())

const companyStore = useCompanyStore()
const message = inject('showToaster')

const isFormValid = ref(false)

const refForm = ref()
const loading = ref(false)

const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '123456',
  groups: "",
})

const { userGroups } = useRolesComposable();

const userRoles = computed(() => {
  return userGroups.value
})

const closeNavigationDrawer = () => {
  emit('update:isOpen', false)

  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = async () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const companyId = JSON.parse(currentUser.value.company_id)
      try {
        loading.value = true

        const response = await companyStore.createNewCompanyUser(localStorage.getItem('baseUrl'), { ...formData.value, groups: [formData.value.groups], company_id: companyId, is_new: true })

        if (response && response.status === 201) {
          loading.value = false
          message('Successfully added a new user', 'success')
          closeNavigationDrawer()
        } else {
          loading.value = false
          message('Failed to add user', 'error')
        }
      } catch (err) {
        loading.value = false
        message('Failed to add user', 'error')
      }
    }
  })
};


const handleDrawerModelValueUpdate = val => {
  emit('update:isOpen', val)
};
</script>



<template>
  <VNavigationDrawer temporary location="end" :width="600" :model-value="props.isOpen" class="scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate">
    <div class="d-flex align-center pa-6 pb-1">
      <small class="mx-5 my-auto">{{ props.data?.name }}</small>

      <VSpacer />

      <div class="text-center">
        <VBtn variant="text" type="button" @click="closeNavigationDrawer">
          Cancel
        </VBtn>
      </div>
    </div>
    <PerfectScrollbar>
      <VCard flat>
        <VCardText>
          <VDivider />
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="() => { }">
            <h1 class="text-center">
              Invite User
            </h1>
            <VRow class="mx-12 mt-12">
              <VCol cols="6">
                <VTextField v-model="formData.first_name" :rules="[requiredValidator]" label="Enter First Name" />
              </VCol>
              <VCol cols="6">
                <VTextField v-model="formData.last_name" :rules="[requiredValidator]" label="Enter Last Name" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.email" :rules="[requiredValidator, emailValidator]" label="Email Address" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.phone_number" :rules="[requiredValidator]" label="Phone Number" />
              </VCol>
              <VCol class="mb-12" cols="12">
                <VAutocomplete v-model="formData.groups" :rules="[requiredValidator]" label="Select Role"
                  :items="userRoles" item-title="name" item-value="id" />
              </VCol>

              <VCol cols="12">
                <VBtn block :loading="loading" variant="tonal" type="submit" @click="onSubmit">
                  Submit
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>



