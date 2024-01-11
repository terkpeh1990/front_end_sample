<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'submit',
  'update:isDialogVisible',
])


const roleData = ref({
  name: '',
})

const onFormSubmit = () => {
  emit('update:modelValue', false)
  emit('submit', roleData.value)
}

const onFormReset = () => {
  roleData.value = {
    name: '',
  }
  emit('update:isDialogVisible', false)
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 700"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-14 pa-5">
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-3">
          Add New Role
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          class="mt-6 mx-5"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <VCol
              cols="12"
            >
              <VTextField
                v-model="roleData.name"
                class="mx-5"
                label="Role Name"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Submit
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
