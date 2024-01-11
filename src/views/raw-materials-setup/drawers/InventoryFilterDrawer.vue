<script setup>
import { useDropdowns } from '@/@core/composable/useDropdown';

import {
  requiredValidator,
} from '@validators';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'sortData',
])

const formData = ref({
  category_id__name: "",
  ordering: "",
})


const { categories } = useDropdowns();


const refForm = ref()
const isFormValid = ref(false)

const loadings = ref([])


// 👉 drawer close
const closeNavigationDrawer = () => {
  loadings.value[0] = false
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const clearFilter = () => {
  refForm.value?.reset()
  refForm.value?.resetValidation()
}

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      loadings.value[0] = true
      emit("sortData", formData.value)
      closeNavigationDrawer()
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
    :width="400"
    location="start"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <div class="d-flex align-center pa-6 pb-1 bg-tonal">
      <h6 class="text-h6">
        Filter Inventory
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
        <VCardText>
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol
                cols="12"
              >
                <VSelect
                  v-model="formData.category_id__name"
                  label="Category"
                  :items="categories"
                  item-title="name"
                  item-value="name"
                />
              </VCol>
            </VRow>

            <div class="text-center mt-5">
              <VBtn
                class="mx-3"
                type="reset"
                variant="outlined"
                @click="clearFilter"
              >
                Clear Filter
              </VBtn>
              <VBtn
                :loading="loadings[0]"
                color="primary"
                class="mx-3"
                :disabled="isFormValid === false"
                type="submit"
              >
                Apply
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
