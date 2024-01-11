<script setup>
import { avatarText, formatDate } from '@/@core/utils/formatters';
import { useUserStore } from '@/stores';
import UserProfile from "@/views/system-settings/user-management-client/userProfileForm.vue"
import { useRoute, useRouter } from 'vue-router';
import Loader from "@/pages/components/Loader.vue";
import { useUserComposable } from "@/@core/composable/useUserComposable"
import ListItem from "@/views/system-settings/company-info-client/ListItem.vue"

const userData = ref({})

const loading = ref(false)
const isConfirmRejectDialogOpen = ref(false)

const route = useRoute()
const router = useRouter()

const { getSingleUserDetails } = useUserStore();

const fetchUserDetails = async () => {
  loading.value = true;
  try {
    const user = !route.params.id ? null : await getSingleUserDetails(route.params.id)

    userData.value = user;
  } catch (error) {
    return error
  } finally {
    loading.value = false;
  }
}

watchEffect(fetchUserDetails)

const editStatus = computed(() => {
  return {
    is_active: !userData.value.is_active,
  }
})


const { updateUserDetails, loading: isSuspending } = useUserComposable({ userId: route.params.id, payload: editStatus, refetch: fetchUserDetails })

const resolveUserStatusVariant = stat => {
  if (stat === true)
    return 'success'
  if (stat === false)
    return 'error'

  return 'primary'
}
</script>

<template>
  <VCardText>
    <div v-if="loading" class="empty_state mt-10 mb-10">
      <Loader />
    </div>
    <template v-else>
      <VRow>
        <VCol cols="12" class="d-print-none d-flex justify-between">
          <div class="float-right">
            <VBtn prepend-icon="tabler-arrow-left" variant="tonal" color="secondary" class="mb-2" @click="router.go(-1)">
              back
            </VBtn>
          </div>
          <div class="float-right d-flex flex mx-3">
            <h2>{{ `${userData.first_name} ${userData.last_name}` }}</h2>
          </div>
          <VSpacer />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="4">
          <VCard>
            <VCardText class="text-center pt-15">
              <!-- 👉 Avatar -->
              <VAvatar rounded :size="120" color="primary" variant="tonal">
                <VImg v-if="userData.avatar" :src="userData.avatar" />
                <span v-else class="text-5xl font-weight-semibold">
                  {{ avatarText(`${userData.first_name} ${userData.last_name}`) }}
                </span>
              </VAvatar>

              <!-- 👉 User fullName -->
              <h6 class="text-h6 mt-4">
                {{ `${userData.first_name} ${userData.last_name}` }}
              </h6>

              <!-- 👉 Role chip -->
              <VChip v-for="role in userData.groups" :key="role.id" label color="primary" size="small"
                class="text-capitalize mt-4">
                {{ role.name }}
              </VChip>
            </VCardText>

            <VDivider />

            <!-- 👉 Details -->
            <VCardText class="align-center">
              <p class="text-sm text-uppercase text-disabled">
                Details
              </p>

              <!-- 👉 User Details list -->
              <VList class="card-list mt-2">
                <ListItem label="Name">
                  {{ `${userData.first_name} ${userData.last_name}` }}
                </ListItem>
                <ListItem label="Email">
                  {{ userData.email }}
                </ListItem>
                <ListItem label="Status">
                  <VChip label size="small" :color="resolveUserStatusVariant(userData.is_active)" class="text-capitalize">
                    {{ userData.is_active ? 'active' : 'inactive' }}
                  </VChip>
                </ListItem>
                <ListItem v-for="role in userData.groups" :key="role.id" label="Role">
                  {{ role.name }}
                </ListItem>

                <ListItem label="Contact">
                  {{ userData.phone_number }}
                </ListItem>
                <ListItem label=" Date Added">
                  {{ formatDate(userData.created_at) }}
                </ListItem>
              </VList>
            </VCardText>

            <!-- 👉 Edit and Suspend button -->
            <VCardText class="d-flex justify-center">
              <VBtn :loading="isSuspending" variant="tonal" :color="userData.is_active ? 'error' : 'primary'"
                @click="isConfirmRejectDialogOpen = !isConfirmRejectDialogOpen">
                {{ userData.is_active ? 'Suspend' : 'Activate' }}
              </VBtn>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="8">
          <div v-if="loading" class="empty_state mt-10 mb-10">
            <Loader />
          </div>
          <template v-else>
            <UserProfile :user="userData" :refetch="fetchUserDetails" />
          </template>
        </VCol>
        <ConfirmDialog v-model:isDialogVisible="isConfirmRejectDialogOpen"
          :confirmation-msg="`Are you sure you want to ${userData.is_active ? 'SUSPEND' : 'ACTIVATE'} ${`${userData.first_name} ${userData.last_name}`} ?`"
          @confirm="(isConfirmed) => {
              if (isConfirmed) {
                updateUserDetails()
              }
            }" />
      </VRow>
    </template>
  </VCardText>
</template>

<route lang="yaml">
  meta:
    navActiveLink: admin-systems-settings-tab
  </route>
