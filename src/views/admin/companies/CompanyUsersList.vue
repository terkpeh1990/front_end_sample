<script setup>
import UsersListTable from "./UsersList.vue";

const isInviteUserDrawerOpen = ref(false);

function toggleAddModal() {
  isInviteUserDrawerOpen.value = false
}
</script>

<template>
  <VCard class="px-0 py-0">
    <div class="d-flex items-center justify-end pa-2">
      <VBtn prepend-icon="tabler-plus" @click="isInviteUserDrawerOpen = true">
        Add User
      </VBtn>
    </div>
    <VCardText>
      <UsersListTable />
    </VCardText>
  </VCard>
</template>
