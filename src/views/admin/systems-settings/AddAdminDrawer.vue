<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import {
  emailValidator,
  requiredValidator,
} from '@validators';
import { useAdminStore } from '@/stores';
import { useRolesComposable } from '@/@core/composable/useFetchRoles';
import { getUser } from '@/@core/services/JwtService';

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  companyData: {
    type: Object,
    default: () => { },
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'companyData',
  'editCompany',
])

const { createNewUser } = useAdminStore()
const message = inject('showToaster')

const isFormValid = ref(false)
const isEditing = ref(false)
const loading = ref(false)
const refForm = ref()
const isOpen = computed(() => props.isDrawerOpen)
const companyEditData = computed(() => props.companyData)

const drawerOpen = ref(false)

watch(isOpen, newVal => {
  drawerOpen.value = newVal
})


const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  groups: "",
})

watch(companyEditData, newVal => {
  formData.value = { ...formData.value, ...newVal }
  isEditing.value = true
})


const { userGroups } = useRolesComposable();

const userRoles = computed(() => {
  return userGroups.value
})

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    isEditing.value = false
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const currentUser = computed(() => getUser())


const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const updateCompany = () => {

}

const onSubmit = async () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const companyId = JSON.parse(currentUser.value.company_id)

      let groups = []
      groups.push(formData.value.groups.id)
      try {
        loading.value = true;

        const payload = { ...formData.value, groups: groups, company_id: companyId, is_new: true }

        const response = await createNewUser({
          payload: payload,
        })

        if ([200, 201].includes(res.status)) {
          message("Admin created successfully", "success")
        } else if (response.status === 400) {
          response.data.email ? message(response?.data?.email[0], 'error') : message('Error Occured', 'error')
        }

      } catch (err) {
        console.log(err)
      } finally {

        loading.value = false;
        closeNavigationDrawer()
      }
    }
  })
}
</script>

<template>
  <VNavigationDrawer temporary :width="500" location="end" class="scrollable-content" :model-value="drawerOpen"
    @update:model-value="handleDrawerModelValueUpdate">
    <div class="d-flex align-center pa-6 pb-1">
      <h6 v-if="!isEditing" class="text-h6">
        Onboard User
      </h6>
      <h6 v-else class="text-h6">
        Edit Company
      </h6>

      <VSpacer />

      <div class="d-flex text-center">
        <VBtn variant="text" @click="closeNavigationDrawer">
          Cancel
        </VBtn>
        <VBtn v-if="!isEditing" :loading="loading" variant="tonal" type="submit" @click="onSubmit">
          Submit
        </VBtn>
        <VBtn v-else variant="tonal" @click="updateCompany">
          Update
        </VBtn>
      </div>
    </div>
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="() => { }">
            <VCol cols="12">
              <VTextField v-model="formData.first_name" :rules="[requiredValidator]" label="Enter First Name" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formData.last_name" :rules="[requiredValidator]" label="Enter Last Name" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formData.email" label="Enter Email" :rules="[requiredValidator, emailValidator]" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formData.phone_number" :rules="[requiredValidator]" label="Phone Number" />
            </VCol>
            <VCol cols="12">
              <VAutocomplete v-model="formData.groups" :rules="[requiredValidator]" label="Select Role" :items="userRoles"
                item-title="name" item-value="id" return-object />
            </VCol>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
