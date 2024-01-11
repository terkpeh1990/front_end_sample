<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

const props = defineProps({
  dialogModelValueUpdate: {
    type: Function,
    default: () => { },
  },
  approveCompany: {
    type: Function,
    default: () => { },
  },
  deleteCompany: {
    type: Function,
    default: () => { },
  },
  editCompany: {
    type: Function,
    default: () => { },
  },
  viewCompany: {
    type: Function,
    default: () => { },
  },
  isLocalDialogVisible: {
    type: Boolean,
    default: false,
  },
  company: {
    type: Object,
    default: () => { },
  },
});

const company = computed(() => props.company);
</script>

<template>
  <VDialog max-width="600" :model-value="props.isLocalDialogVisible" max-height="auto"
    :fullscreen="$vuetify.display.width < 600" class="d-flex justify-center"
    @update:model-value="props.dialogModelValueUpdate">
    <PerfectScrollbar :options="{ wheelPropagation: false, suppressScrollX: true }" class="h-100">
      <VCard title="Actions">
        <VCardText>
          <h4 class="text-center text-primary" color="primary">
            {{ company.name }}
          </h4>
        </VCardText>
        <VCardText>
          <div class="d-flex items-center justify-center gap-4 my-8">
            <VBtn variant="tonal" color="success" @click="() => props.approveCompany(company.id, 'approve')">
              Approve
            </VBtn>
            <VBtn variant="tonal" color="error" @click="() => props.deleteCompany(company.id, 'delete')">
              Delete
            </VBtn>
          </div>
          <div class="d-flex items-center justify-center my-8">
            <VBtn variant="tonal" color="warning" @click="() => props.viewCompany(company.id, 'view')">
              View Details
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VDialog>
</template>
