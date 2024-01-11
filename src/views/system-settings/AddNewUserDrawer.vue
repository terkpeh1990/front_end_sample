<script setup>
import { useRoleStore, useCompanyStore } from '@/stores';
import {
  emailValidator,
  requiredValidator,
} from '@validators';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  data: { type: Object, default: () => {} },
})

const emit = defineEmits([
  'update:isDrawerOpen',
])

const store = useRoleStore()
const companyStore = useCompanyStore()
const message = inject('showToaster')

const isFormValid = ref(false)

const refForm = ref()
const loadings = ref([])

const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '123456',
  groups: "",
})

const userGroups = ref([])

const companyId = computed(() => props.data?.id)

const fetchRoles = async () => {

  const res = await store.fetchRoles(localStorage.getItem('baseUrl'))

  userGroups.value = res.data
}

watchEffect(fetchRoles)

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const onSubmit = async () => {
  refForm.value?.validate().then( async ({ valid }) => {
    if (valid) {
      try {
        loadings.value[0] = true

        const response = await companyStore.createNewCompanyUser(localStorage.getItem('baseUrl'), { ...formData.value, groups: [formData.value.groups], company_id: companyId.value, is_new: true })

        if(response && response.status === 201) {
          loadings.value[0] = false
          message('Successfully added a new user', 'success')
          closeNavigationDrawer()
        } else {
          loadings.value[0] = false
          message('Failed to add user', 'error')
        }
      } catch(err) {
        loadings.value[0] = false
        message('Failed to add user', 'error')

      }
    }
  })}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="600"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <div class="d-flex align-center pa-6 pb-1">
      <small class="mx-5 my-auto">{{ props.data?.name }}</small>
  
      <VSpacer />
  
      <div class="text-center">
        <VBtn
          variant="text"
          type="button"
          @click="closeNavigationDrawer"
        >
          Cancel
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
            <h1 class="text-center">
              Invite Admin
            </h1>
            <VRow class="mx-12 mt-12">
              <VCol cols="6">
                <VTextField
                  v-model="formData.first_name"
                  :rules="[requiredValidator]"
                  label="Enter First Name"
                />
              </VCol>
              <VCol cols="6">
                <VTextField
                  v-model="formData.last_name"
                  :rules="[requiredValidator]"
                  label="Enter Last Name"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="formData.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email Address"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="formData.phone_number"
                  :rules="[requiredValidator]"
                  label="Phone Number"
                />
              </VCol>
              <VCol
                class="mb-12"
                cols="12"
              >
                <VAutocomplete
                  v-model="formData.groups"
                  :rules="[requiredValidator]"
                  label="Select Role"
                  :items="userGroups"
                  item-title="name"
                  item-value="id"
                />
              </VCol>
              <VBtn
                block
                :loading="loadings[0]"
                variant="tonal"
                type="submit"
                @click="onSubmit"
              >
                Submit
              </VBtn>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
