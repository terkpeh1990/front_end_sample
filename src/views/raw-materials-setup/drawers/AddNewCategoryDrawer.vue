<!-- eslint-disable vue/require-valid-default-prop -->
<script setup>
import { requiredValidator } from '@validators';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { getUser } from '@core/services/JwtService'
import { useCategoryStore } from '@/stores'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  data: { type: Object, default: { name: "", description: "" } },
  title: { type: String, required: true },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'categoryData',
])

const message = inject('showToaster')

const isFormValid = ref(false)
const store = useCategoryStore()
const refForm = ref()
const editData = computed(() => props.data)
const isEditing = ref(false)

const formData = ref({
  name: '',
  description: '',
})

watch(editData, newVal => {
  formData.value = { ...newVal }
  isEditing.value = true
})


const drawerTitle = computed(() => props.title)
const loadings = ref([])

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  loadings.value[0] = false
  isEditing.value = false
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        loadings.value[0] = true

        const res = await store.createNewCategory({ ...formData.value, company_id: JSON.parse(getUser().company_id) })

        if (res.status === 201) {
          emit('categoryData', { message: 'Successfully added a new category', color: 'success', isVisible: true })
          message('Successfully added a new category', 'success')
          closeNavigationDrawer()
        } else {
          loadings.value[0] = false
          emit('categoryData', { message: 'Operation Failed', color: 'error', isVisible: true })
          message('Failed to add new category', 'error')
        }
      } catch(e) {
        loadings.value[0] = false
        emit('categoryData', { message: 'Operation Failed', color: 'error', isVisible: true })
        message('Failed to add new category', 'error')

      }
    }
  })
}

const updateForm = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        loadings.value[0] = true

        const { id, created_at, ...rest } = formData.value

        const res = await store.updateCategory(id, { ...rest })

        if (res.status === 200) {
          emit('categoryData', { message: 'Successfully updated', color: 'success', isVisible: true })
          message('Successfully updated category', 'success')
          closeNavigationDrawer()
        } else {
          loadings.value[0] = false
          emit('categoryData', { message: 'Operation Failed', color: 'error', isVisible: true })
          message('Failed to update category', 'error')
        }
      } catch(e) {
        loadings.value[0] = false
        emit('categoryData', { message: 'Operation Failed', color: 'error', isVisible: true })
        message('Failed to update category', 'error')
      }
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
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <div class="d-flex align-center pa-6 pb-1 bg-tonal">
      <h6 class="text-h6">
        {{ drawerTitle }}
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
            <VRow>
              <div class="d-flex w-100 align-center mt-5">
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="formData.name"
                      class="mt-5"
                      :rules="[requiredValidator]"
                      label="Enter Category Name"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextarea
                      v-model="formData.description"

                      class="mt-5"
                      :rules="[requiredValidator]"
                      label="Enter Category description"
                    />
                  </VCol>
                </VRow>
              </div>
            </VRow>
            <div
              v-if="!isEditing"
              class="text-center mt-12"
            >
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
            <div
              v-else
              class="text-center mt-12"
            >
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
                @click.prevent="updateForm"
              >
                Update
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
