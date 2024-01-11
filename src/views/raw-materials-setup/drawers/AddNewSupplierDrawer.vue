<!-- eslint-disable vue/require-valid-default-prop -->
<script setup>
import { requiredValidator } from '@validators';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { useSupplierStore } from '@/stores'
import countries from '@/@core/data/countries-states-cities.json';


const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  isEditing: { type: Boolean, default: () => false },
  data: { type: Object, default: { name: "", phone_number: "" } },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'supplierData',
])

const _countries = computed(() => Object.keys(countries)) ?? []

const message = inject('showToaster')

const isFormValid = ref(false)
const store = useSupplierStore()
const refForm = ref()
const editData = computed(() => props.data)
const isEditing = ref(props.isEditing)

const formData = ref({
  name: '',
  phone_number: '',
  address: {
    city: '',
    street: '',
    country: '',
  },
})

watch(editData, newVal => {
  
  formData.value =  structuredClone(toRaw(newVal.data))
  isEditing.value = true
})


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

        const res = await store.createNewSupplier(formData.value)

        if (res.status === 201) {
          emit('supplierData', { message: 'Successfully added a new supplier', color: 'success', isVisible: true })
          message('Successfully added a new supplier', 'success')
          closeNavigationDrawer()
        } else {
          loadings.value[0] = false
          emit('supplierData', { message: 'Operation Failed', color: 'error', isVisible: true })
          message('Failed to add new supplier', 'error')
        }
      } catch(e) {
        loadings.value[0] = false
        emit('supplierData', { message: 'Operation Failed', color: 'error', isVisible: true })
        message('Failed to add new supplier', 'error')

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

        const res = await store.updateSupplier(id, { ...rest })

        if (res.status === 200) {
          emit('supplierData', { message: 'Successfully updated', color: 'success', isVisible: true })
          message('Successfully updated supplier', 'success')
          closeNavigationDrawer()
        } else {
          loadings.value[0] = false
          emit('supplierData', { message: 'Operation Failed', color: 'error', isVisible: true })
          message('Failed to update supplier', 'error')
        }
      } catch(e) {
        loadings.value[0] = false
        emit('supplierData', { message: 'Operation Failed', color: 'error', isVisible: true })
        message('Failed to update supplier', 'error')
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
      <h6
        v-if="!isEditing"
        class="text-h6"
      >
        Add New Supplier
      </h6>
      <h6
        v-else
        class="text-h6"
      >
        Edit Supplier
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
                      label="Enter Supplier Name"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="formData.phone_number"
                      class="mt-5"
                      :rules="[requiredValidator]"
                      label="Phone Number"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VAutocomplete
                      v-model="formData.address.country"
                      class="mt-5"
                      :rules="[requiredValidator]"
                      label="Select Country"
                      :items="_countries"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="formData.address.city"
                      class="mt-5"
                      :rules="[requiredValidator]"
                      label="Enter City"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="formData.address.street"
                      class="mt-5"
                      :rules="[requiredValidator]"
                      label="Enter Address"
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
