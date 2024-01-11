<script setup>
import { initialAbility } from '@/plugins/casl/ability';
import { useAppAbility } from '@/plugins/casl/useAppAbility';
import router from '@/router';
import avatar1 from '@images/avatars/blank.png';


const props = defineProps({
  userDetails: { type: Object, required: true },
})

const authUser = ref(props.userDetails)
const ability = useAppAbility()

const logout = () => {

  localStorage.removeItem('refresh_token')
  localStorage.removeItem('token')
  localStorage.removeItem('baseUrl')
  router.push('/login').then(() => {
    localStorage.removeItem('userAbilities')

    // Reset ability to initial ability
    ability.update(initialAbility)
  })
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ authUser.first_name }} {{ authUser.last_name }}
            </VListItemTitle>
            <VListItemSubtitle>{{ authUser.groups[0] }}</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem
            link
            @click="$router.push('/profile-settings')"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-user"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-settings"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem
            link
            @click="logout"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
