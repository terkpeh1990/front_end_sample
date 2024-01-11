<script setup>
import Toaster from '@/pages/components/Toaster.vue';
import { useUserStore } from '@/stores';
import {
  confirmedValidator,
  passwordValidator,
  requiredValidator,
} from '@validators';
import { watchEffect } from 'vue';

const userStore = useUserStore()
const isLoading = ref(true)
const message = inject('showToaster')


const profileData = ref({
  first_name: '',
  last_name: '',
  phone_number: '',
})

const securityData = ref({
  newPassword: '',
  currentPassword: '',
  confirmPassword: '',
})

const fetchUser = async () => {

  const res = await userStore.getSingleUser()

  if (res && res.status === 200) {
    isLoading.value = false
    profileData.value = res.data
  }
}

watchEffect(fetchUser)

const refInputEl = ref()
const loadings = ref([])
const isConfirmDialogOpen = ref(false)
const isCurrentPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isSecurityFormValid = ref(false)
const isProfileFormValid = ref(false)
const refSecurityForm = ref()
const refProfileForm = ref()

const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [v => !!v || 'Please confirm account deactivation']


const submitPasswordForm = async () => {
  refSecurityForm.value?.validate().then( async ({ valid }) => {
    if (valid) {
      loadings.value[0] = true

      const res = await userStore.updatetUserPassword({ old_password: securityData.value.currentPassword, new_password: securityData.value.newPassword })

      if (res.status === 200) {
        loadings.value[0] = false
        message('Successfully updated password', 'success')
        nextTick(() => {
          refSecurityForm.value?.reset()
          refSecurityForm.value?.resetValidation()
        })
      }else {
        loadings.value[0] = false
        message('Password update failed. Check your current Password', 'error')

      }
    }
  })

}

const submitProfileForm = async () => {
  refProfileForm.value?.validate().then( async ({ valid }) => {
    if (valid) {
      console.log({ ...profileData.value })
    
      // const res = await userStore.updateUserPassword({ ...profileData.value })
    
      // if (res.status === 200) {
    
      // }
    }
  })

}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      // if (typeof fileReader.result === 'string')
      // accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  // accountDataLocal.value.avatarImg = accountData.avatarImg
}
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Profile Information"
          :loading="isLoading"
        >
          <VRow>
            <VCol
              cols="4"
              class="d-none d-md-flex d-lg-flex"
            >
              <VCardText>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, ullam.</p>
              </VCardText>
            </VCol>
            <VCol
              cols="12"
              md="8"
            >  
              <VCardText class="pt-2">
                <!-- 👉 Form -->
                <VForm
                  ref="refProfileForm"
                  v-model="isProfileFormValid"
                  class="mt-6"
                  @submit.prevent="() => {}"
                >
                  <VRow>
                    <!-- 👉 First Name -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="profileData.first_name"
                        label="First Name"
                        :rules="[requiredValidator]"
                      />
                    </VCol>
  
                    <!-- 👉 Last Name -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="profileData.last_name"
                        :loading="isLoading"
                        label="Last Name"
                        :rules="[requiredValidator]"
                      />
                    </VCol>
  
                    <!-- 👉 Email -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="profileData.email"
                        :loading="isLoading"
                        label="E-mail"
                        type="email"
                        disabled
                      />
                    </VCol>
                    <!-- 👉 Form Actions -->
                    <VCol
                      cols="12"
                      class="d-flex gap-4 mx-auto"
                    >
                      <VSpacer />
                      <VBtn
                        type="submit"
                        @click="submitProfileForm"
                      >
                        Update
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
  
      <VCol cols="12">
        <!-- 👉 Delete Account -->
        <VCard title="Security">
          <VCardText
            class="pt-0"
            title="Edit Password"
          >
            <VRow>
              <VCol
                cols="4"
                class="d-none d-md-flex d-lg-flex"
              >
                <p>
                  Ensure your account is using a long, random password to stay secure.
                </p>
              </VCol>
              <VCol
                cols="12"
                md="8"
              >
                <VForm
                  ref="refSecurityForm"
                  v-model="isSecurityFormValid"
                  @submit.prevent="() => {}"
                >
                  <VCardText class="pt-2">
                    <!-- 👉 Current Password -->
                    <VRow class="mb-3">
                      <VCol
                        cols="12"
                        md="6"
                      >
                        <!-- 👉 current password -->
                        <VTextField
                          v-model="securityData.currentPassword"
                          :type="isCurrentPasswordVisible ? 'text' : 'password'"
                          :append-inner-icon="isCurrentPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                          label="Current Password"
                          :rules="[requiredValidator]"
                          @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                        />
                      </VCol>
                    </VRow>
  
                    <!-- 👉 New Password -->
                    <VRow>
                      <VCol
                        cols="12"
                        md="6"
                      >
                        <!-- 👉 new password -->
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
                        md="6"
                      >
                        <!-- 👉 confirm password -->
                        <VTextField
                          v-model="securityData.confirmPassword"
                          :type="isConfirmPasswordVisible ? 'text' : 'password'"
                          :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                          :rules="[requiredValidator, confirmedValidator(securityData.confirmPassword, securityData.newPassword)]"
                          label="Confirm New Password"
                          @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                        />
                      </VCol>
                    </VRow>
                    <VCol
                      cols="12"
                      class="d-flex gap-4 mx-auto"
                    >
                      <VSpacer />
                      <VBtn
                        color="primary"
                        class="mt-3"
                        type="submit"
                        :loading="loadings[0]"
                        :disabled="isSecurityFormValid === false"
                        @click="submitPasswordForm"
                      >
                        Update
                      </VBtn>
                    </VCol>
                  </VCardText>
                </VForm>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
  
      <VCol cols="12">
        <!-- 👉 Delete Account -->
        <VCard title="Delete Account">
          <VCardText>
            <!-- 👉 Checkbox and Button  -->
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"
            >
              <VAlertTitle class="mb-1">
                Are you sure you want to delete your account?
              </VAlertTitle>
              <p class="mb-0">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </VAlert>
            <div>
              <VCheckbox
                v-model="isAccountDeactivated"
                :rules="validateAccountDeactivation"
                label="I confirm my account deactivation"
              />
            </div>
  
            <VBtn
              :disabled="!isAccountDeactivated"
              color="error"
              class="mt-3"
              @click="isConfirmDialogOpen = true"
            >
              Deactivate Account
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  
    <!-- Confirm Dialog -->
    <ConfirmDialog
      v-model:isDialogVisible="isConfirmDialogOpen"
      confirmation-msg="Are you sure you want to deactivate your account?"
    />
  </div>
</template>
