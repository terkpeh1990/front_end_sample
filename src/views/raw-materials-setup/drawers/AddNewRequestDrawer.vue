<!-- eslint-disable vue/require-valid-default-prop -->
<script setup>
import {
  requiredValidator,
} from '@validators';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import NewRequestEdit from '../forms/NewRequestEdit.vue';


const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'brandData',
])

const loadings = ref([])

const invoiceData = ref({
  id: 1,
  invoice: {
    id: '546',
    name: '',
    client: {
      name: '',
      company: '',
      address: '',
      contact: '',
      country: '',
      companyEmail: '',
    },
    issuedDate: '',
    dueDate: '',
  },
  purchasedProducts: [],
})

const isFormValid = ref(false)
const refForm = ref()

const formData = ref({
  name: '',
  description: '',
})

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loadings.value[0] = true
      console.log({ ...formData.value });

      setTimeout(() => {
        loadings.value[0] = false
        emit('update:isDrawerOpen', false)
        nextTick(() => {
          refForm.value?.reset()
          refForm.value?.resetValidation()
        })
      }, 2000)
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="600"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <div class="d-flex align-center pa-6 pb-1 bg-tonal">
      <h6 class="text-h6">
        New Request
      </h6>

      <VSpacer />

      <!-- 👉 Close btn -->
      <VBtn
        variant="tonal"
        color="default"
        icon
        size="32"
        class="rounded"
        @click="closeNavigationDrawer"
      >
        <VIcon
          size="18"
          icon="tabler-x"
        />
      </VBtn>
    </div>

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText class="mt-5">
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow class="mb-5">
              <div class="d-flex w-100 align-center mt-5">
                <VRow>
                  <VCol cols="12">
                    <VSelect
                      v-model="formData.name"
                      class="mt-5"
                      :rules="[requiredValidator]"
                      label="Select Brand"
                      :items="[]"
                    />
                  </VCol>
                  <VCol cols="12">
                    <NewRequestEdit :data="invoiceData" />
                  </VCol>
                </VRow>
              </div>
            </VRow>

            <div class="text-center mt-5">
              <VBtn
                class="mx-3"
                type="reset"
                variant="outlined"
                @click="closeNavigationDrawer"
              >
                Cancel
              </VBtn>
              <VBtn
                :loading="loadings[0]"
                class="mx-3"
                :disabled="isFormValid === false"
                type="submit"
              >
                Create
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
