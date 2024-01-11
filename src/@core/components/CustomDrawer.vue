<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Title',
  },
  closeModal: {
    type: Function,
    default: () => {},
  },
})
</script>

<template>
  <VDialog
    max-width="550"
    :model-value="props.show"
    height="100%"
    :fullscreen="$vuetify.display.width < 500"
    class="d-flex justify-end"
    transition="dialog-right-transition"
    content-class="my-custom-dialog"
  >
    <PerfectScrollbar
      :options="{ wheelPropagation: false, suppressScrollX: true }"
      class="scroll-bar rounded-0"
    >
      <VCard height="100vh">
        <VCardText class="flex d-flex align-center justify-space-between pa-4">
          <div>
            <p class="mb-0">
              {{ props.title || 'Title' }}
            </p>
          </div>
          <VBtn
            icon
            variant="text"
            color="default"
            size="x-small"
            @click="props.closeModal"
          >
            <VIcon
              size="22"
              icon="tabler-x"
            />
          </VBtn>
        </VCardText>
        <VDivider />
        <VCardText>
          <slot />
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VDialog>
</template>

<style lang="scss" scoped>
.scroll-bar {
  height: 100vh !important;
  margin: -24px;
}

.my-custom-dialog {
    align-self: flex-end;
    border-radius: 0 !important;
    .v-overlay__content{
      height: 100vh !important;
      border-radius: 0 !important;
    }
}
</style>
