<!-- eslint-disable import/no-unresolved -->
<script setup>
import { useRoute } from 'vue-router';
import UsersList from "./userList.vue"
import RolesPermissions from "./rolesPermissions.vue"

const props = defineProps({
  openModal: {
    type: Function,
    default: ()=> {},
  },
})

const route = useRoute()
const activeTab = ref('users-list')
const isInviteUserVisible = ref(true)

const tabs = [
  {
    title: 'Users List',
    icon: 'tabler-use',
    tab: 'users-list',
  },
  {
    title: 'Roles and Permissions',
    icon: 'tabler-loc',
    tab: 'roles-permissions',
  },
]
</script>

<template>
  <VCard
    class="pa-4"
    height="auto"
    min-height="580"
  >
    <VTabs>
      <template
        v-for="item in tabs"
        :key="item.icon"
      >
        <VTab
          class="px-2"
          :value="item.tab"
          @click="activeTab = item.tab"
        >
          {{ item.title }}
        </VTab>
      </template>
    </VTabs>
 
    <div v-if="activeTab === 'users-list'">
      <UsersList :open-modal="props.openModal" />
    </div>
    <div v-if="activeTab === 'roles-permissions'">
      <RolesPermissions />
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>

<route lang="yaml">
meta:
  navActiveLink: system-settings-tab
</route>
