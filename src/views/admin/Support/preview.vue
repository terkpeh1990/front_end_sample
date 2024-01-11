
<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import SupportLogs from "@/views/admin/Support/SupportLogs.vue"

const search = ref('');

const data = ref([
  {
    fullName: 'Richy rich',
    senderId: '93182fuiw',
    message: 'What are you doing',
    messages: {
      message: 'What re you doing',
      time: '2, May',
    },
    about: 'My Next payment',
  },
  {
    fullName: 'Godwin',
    senderId: '4jrnhef8',
    message: 'What are you doing',
    messages: {
      message: 'What re you doing',
      time: '5, May',
    },
    about: 'My Next payment',
  },
]);
</script>

<template>
  <VMain class="chat-content-container">
    <div>
      <VTextField v-model="search" density="compact" placeholder="Search..." class="ms-4 me-1 chat-list-search">
        <template #prepend-inner>
          <VIcon size="22" icon="tabler-search" />
        </template>
      </VTextField>
      <VDivider />
      <PerfectScrollbar tag="ul" class="chat-contacts-list px-3" :options="{ wheelPropagation: false }">
        <li>
          <span class="chat-contact-header d-block text-primary text-xl font-weight-medium">Support messages</span>
        </li>
        <SupportLogs v-for="support in data" :key="support.senderId" :support="support" />
        <span v-show="!data.length" class="no-chat-items-text text-disabled">No chats found</span>
      </PerfectScrollbar>
    </div>


    <!-- 👉 Start conversation -->
    <div class="d-flex h-100 align-center justify-center flex-column">
      <VAvatar size="109" class="elevation-3 mb-6 bg-surface">
        <VIcon size="50" class="rounded-0 text-high-emphasis" icon="tabler-message" />
      </VAvatar>
      <p class="mb-0 px-6 py-1 font-weight-medium text-lg elevation-3 rounded-xl text-high-emphasis bg-surface"
        :class="[{ 'cursor-pointer': $vuetify.display.smAndDown }]" @click="startConversation">
        Start Conversation
      </p>
    </div>
  </VMain>
</template>

<style lang="scss" scoped>
.chat-content-container {
  // background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
  display: grid;
  grid-template-columns: 300px auto;
  height: 100%;
  min-height: 80vh;

  // Adjust the padding so text field height stays 48px
  .chat-message-input {
    .v-field__append-inner {
      align-items: center;
      padding-block-start: 0;
    }
  }
}

.chat-contacts-list {
  --chat-content-spacing-x: 12px;

  padding-block-end: 0.75rem;

  .chat-contact-header {
    margin-block-end: 1rem;
    margin-block-start: 1.25rem;
  }

  .chat-contact-header,
  .no-chat-items-text {
    margin-inline: var(--chat-content-spacing-x);
  }
}
</style>
