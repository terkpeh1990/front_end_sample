<!-- eslint-disable vue/require-valid-default-prop -->
<script setup>
import {
  requiredValidator,
} from '@validators';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { getUser } from '@core/services/JwtService'
import { useBrandStore } from '@/stores'

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
  'brandData',
])

const message = inject('showToaster')

const loadings = ref([])

const isFormValid = ref(false)
const store = useBrandStore()

const refForm = ref()
const editData = computed(() => props.data)

const formData = ref({
  name: '',
})

const drawerTitle = computed(() => props.title)
const isEditing = ref(false)

watch(editData, newVal => {
  formData.value = { ...newVal, name: newVal.brand_name }
  isEditing.value = true
})

// 👉 drawer close
const closeNavigationDrawer = () => {
  loadings.value[0] = false
  isEditing.value = false
  emit('update:isDrawerOpen', false)
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

        const res = await store.createNewBrand({ ...formData.value, brand_name: formData.value.name, company_id: JSON.parse(getUser().company_id) })

        if (res.status === 201) {
          emit('brandData', { message: 'Successfully added a new brand', color: 'success', isVisible: true })
          message('Successfully added a new brand', 'success')
          closeNavigationDrawer()
        } else {
          loadings.value[0] = false
          emit('brandData', { message: 'Operation Failed', color: 'error', isVisible: true })
          message('Failed to add brand', 'error')
        }
      } catch(e) {
        loadings.value[0] = false
        emit('brandData', { message: 'Operation Failed', color: 'error', isVisible: true })
        message('Failed to add brand', 'error')

      }
    }
  })
}


const updateForm = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        loadings.value[0] = true

        const { id, name, company_id } = formData.value

        const res = await store.updateBrand(id, { brand_name: name, company_id })

        if (res.status === 200) {
          emit('brandData', { message: 'Successfully updated', color: 'success', isVisible: true })
          message('Successfully updated brand', 'success')
          closeNavigationDrawer()
        } else {
          loadings.value[0] = false
          emit('brandData', { message: 'Operation Failed', color: 'error', isVisible: true })
          message('Failed to update brand', 'error')
        }
      } catch(e) {
        loadings.value[0] = false
        emit('brandData', { message: 'Operation Failed', color: 'error', isVisible: true })
        message('Failed to update brand', 'error')

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
            <VRow class="mb-5">
              <div class="d-flex w-100 align-center mt-5">
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="formData.name"
                      class="mt-5"
                      :rules="[requiredValidator]"
                      label="Enter Brand Name"
                    />
                  </VCol>
                </VRow>
              </div>
            </VRow>

            <div
              v-if="!isEditing"
              class="text-center mt-5"
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
              class="text-center mt-5"
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
