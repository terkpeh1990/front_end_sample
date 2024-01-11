<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import {
  confirmedValidator,
  passwordValidator,
  requiredValidator,
  emailValidator,
} from '@validators';
import { useRolesComposable } from "@/@core/composable/useFetchRoles";
import { useUserComposable } from '@/@core/composable/useUserComposable';


const props = defineProps({
  user: {
    type: Object,
    default: () =>{},
  },
  refetch: {
    type: Function,
    default: () => {},
  },
})

const getFirstRole = el => {
  return el?.groups?.length ? el?.groups[0] : {};
}

const computedUser = computed(() => {
  return {
    Email: props.user.email,
    Password: '.......',
    Role: getFirstRole(props.user)?.name,
  };
})


const isLocalDialogVisible = ref(false)
const isFormValid = ref(false)
const securityData = ref({})
const email = ref('')
const role = ref()
const editingField = ref('Email')
const isConfirmPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)

const setValues = () => {
  email.value = props.user.email;
  role.value = getFirstRole(props.user);
}

watchEffect(setValues)

const { userGroups } = useRolesComposable();

const userRoles = computed(() => {
  return userGroups.value
})


const toggleModal = label => {
  editingField.value =  label;
  isLocalDialogVisible.value = !isLocalDialogVisible.value
}

const editData = computed(() => {
  return editingField.value === 'Email' ? { email: email.value } : { groups: [role.value.id] };
})

const { updateUserDetails, loading } = useUserComposable({ userId: props.user.id, payload: editData, refetch: props.refetch })
</script>

<template>
  <VCard title="Profile">
    <VDivider />
    <VTable
      v-if="Object.entries(props.user).length > 0"
      class="text-no-wrap"
    >
      <tbody>
        <tr
          v-for="[label, val] in Object.entries(computedUser)"
          :key="label"
          class="cursor-pointer"
          style="height: 3.75rem;"
          @click="toggleModal(label)"
        >
          <td>
            <p class="text-base mb-0">
              {{ label }}
            </p>
          </td>
         
          <td>
            {{ val }}
          </td>
          <td
            class=""
            width="100"
          >
            <VBtn
              icon
              size="x-small"
              color="default"
              variant="text"
            >
              <VIcon
                size="22"
                icon="tabler-edit"
              />
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDialog
      max-width="600"
      :model-value="isLocalDialogVisible"
      :height="$vuetify.display.smAndUp ? '550' : '100%'"
      :fullscreen="$vuetify.display.width < 600"
      class="d-flex justify-center"
    >
      <PerfectScrollbar
        :options="{ wheelPropagation: false, suppressScrollX: true }"
        class="h-500"
      >
        <VCard
          class=""
          height="500"
        >
          <VCardText class="flex d-flex align-center justify-space-between pa-4">
            <div>
              <p class="mb-0">
                Update {{ editingField }}
              </p>
            </div>
            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
              @click="toggleModal"
            >
              <VIcon
                size="22"
                icon="tabler-x"
              />
            </VBtn>
          </VCardText>
          <VDivider />
          <VCardText>
            <VCol
              class="mb-2"
              cols="12"
            >
              <template v-if="editingField === 'Email'">
                <VCol
                  cols="12"
                >
                  <p class="text-sm text-capitalize mb-4">
                    {{ editingField }}
                  </p>
                  <VTextField
                    v-model="email"
                    label="Enter Email"
                    type="email"
                    class="custom_input"
                    :rules="[requiredValidator, emailValidator]"
                  />
                </VCol>
              </template>
              <template v-if="editingField === 'Role'">
                <VCol
                  cols="12"
                >
                  <p class="text-sm text-capitalize mb-4">
                    Edit {{ editingField }}
                  </p>
                  <VAutocomplete
                    v-model="role"
                    :rules="[requiredValidator]"
                    label="Select Role"
                    :items="userRoles"
                    item-title="name"
                    item-value="id"
                    return-object
                  />
                </VCol>
              </template>
              <template v-if="editingField === 'Password'">
                <!-- 👉 New Password -->
                
                <VCol
                  cols="12"
                >
                  <!-- 👉 new password -->
                  <p class="text-sm text-capitalize mb-4">
                    New {{ editingField }}
                  </p>
                  <VTextField
                    v-model="securityData.newPassword"
                    :type="isNewPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                    :rules="[requiredValidator, passwordValidator]"
                    label="New Password"
                    @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                  />
                </VCol>
    
                <VCol
                  cols="12"
                >
                  <!-- 👉 confirm password -->
                  <p class="text-sm text-capitalize mb-4">
                    Confirm {{ editingField }}
                  </p>
                  <VTextField
                    v-model="securityData.confirmPassword"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                    :rules="[requiredValidator, confirmedValidator(securityData.confirmPassword, securityData.newPassword)]"
                    label="Confirm New Password"
                    @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  />
                </VCol>
              </template>
              <div class="mt-4 pa-3">
                <VBtn
                  block
                  :loading="loading"
                  @click="updateUserDetails"
                >
                  Submit
                </VBtn>
              </div>
            </VCol>
          </VCardText>
        </VCard>
      </PerfectScrollbar>
    </VDialog>
  </VCard>
</template>
