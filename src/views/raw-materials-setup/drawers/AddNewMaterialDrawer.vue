<script setup>
import { useDropdowns } from '@/@core/composable/useDropdown';
import { getUser } from '@/@core/services/JwtService';
import { useRawMaterialsStore } from '@/stores';
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
  'materialData',
])

const message = inject('showToaster')
const { brands, categories } = useDropdowns();

const formData = ref({
  brand_id: "",
  category_id: "",
  name: "",
  restock_level: "",
  measurement_unit: "",
  material_data: {},
})

const showBrandField = ref(true)

watch(formData, (newVal, oldVal) => {
  if (newVal?.category_id?.name?.toLowerCase().includes('ingredient')) {
    showBrandField.value = false
    formData.value.brand_id = ''
  } else {
    showBrandField.value = true
  }

}, { deep: true })

const staticFields = ref([
  {
    type: 'TextField',
    vmodel: 'name',
    fieldName: ref('Name'),
  },
  {
    type: 'DropDown',
    vmodel: 'category_id',
    fieldName: ref('Categories'),
    selectItems: categories,
  },
  {
    isVisible: showBrandField,
    type: 'DropDown',
    vmodel: 'brand_id',
    fieldName: ref('Brands'),
    selectItems: brands,
  },
  {
    type: 'TextField',
    vmodel: 'restock_level',
    fieldName: 'Restock Level',
  },
  {
    type: 'TextField',
    vmodel: 'measurement_unit',
    fieldName: 'Measurement Unit',
  },
])

const currentUser = computed(() => getUser())

const materialStore = useRawMaterialsStore()

const formFields = ref([])

const fetchMaterialFormFields = async () => {
  const res = await materialStore.fetchRawMaterialsForm()

  if (res && res.status === 200) {
    const parsedData = res.data.data[0]?.materialform_data.formFields ?? JSON.stringify([])

    formFields.value = JSON.parse(parsedData)
  }
}

watch(formFields, () => {
  formFields.value.forEach(field => {
    formData.value.material_data[field.fieldName.toLowerCase()] = ''
  })
})

watchEffect(fetchMaterialFormFields)

const refForm = ref()
const isFormValid = ref(false)
const formTitle = computed(() => props.title)

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

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      loadings.value[0] = true

      const res = await materialStore.createRawMaterial({ ...formData.value, category_id: formData.value.category_id.id, company_id: JSON.parse(currentUser.value.company_id), brand_id: formData.value.brand_id ? formData.value.brand_id.id : null })

      if (res.status === 201) {
        emit("materialData")
        message('Successfully added a new material', 'success')
        closeNavigationDrawer()
      } else {
        loadings.value[0] = false
        message('Failed to add new material', 'error')
      }
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer temporary :width="500" location="end" class="scrollable-content" :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate">
    <div class="d-flex align-center pa-6 pb-1 bg-tonal">
      <h6 class="text-h6">
        Add New Material
      </h6>

      <VSpacer />

      <!-- 👉 Close btn -->
      <VBtn variant="tonal" color="default" icon size="32" class="rounded" @click="closeNavigationDrawer">
        <VIcon size="18" icon="tabler-x" />
      </VBtn>
    </div>

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <template v-for="sField in staticFields" :key="sField.fieldName">
                <template v-if="sField.type === 'DropDown'">
                  <VCol v-if="(sField.fieldName === 'Brands' && sField?.isVisible) || sField.fieldName === 'Categories'"
                    cols="12">
                    <VSelect v-model="formData[sField.vmodel.toLowerCase()]" :rules="[requiredValidator]"
                      :label="sField.fieldName" :items="sField.selectItems"
                      :item-title="sField.fieldName === 'Categories' ? 'name' : 'brand_name'" item-value="id"
                      return-object />
                  </VCol>
                </template>
                <template v-if="sField.type === 'TextField'">
                  <VCol cols="12">
                    <VTextField v-model="formData[sField.vmodel.toLowerCase()]" :rules="[requiredValidator]"
                      :label="sField.fieldName" />
                  </VCol>
                </template>
              </template>
              <template v-for="field in formFields" :key="field.id">
                <template v-if="field.type.toLowerCase() === 'text field'">
                  <VCol v-if="field.textFieldType === 'Date'" cols="12">
                    <AppDateTimePicker v-model="formData.material_data[field.fieldName.toLowerCase()]"
                      :rules="[requiredValidator]" density="compact" :placeholder="`${field.fieldName} YYYY-MM-DD`" />
                  </VCol>
                  <VCol v-else cols="12">
                    <VTextField v-model="formData.material_data[field.fieldName.toLowerCase()]"
                      :rules="[requiredValidator]" :label="field.fieldName" />
                  </VCol>
                </template>
                <template v-if="field.type.toLowerCase() === 'dropdown'">
                  <VCol cols="12">
                    <VSelect v-model="formData.material_data[field.fieldName.toLowerCase()]" :rules="[requiredValidator]"
                      :label="field.fieldName" :items="field.selectItems" />
                  </VCol>
                </template>
                <template v-if="field.type.toLowerCase() === 'text area'">
                  <VCol cols="12">
                    <VTextarea v-model="formData.material_data[field.fieldName.toLowerCase()]"
                      :rules="[requiredValidator]" :label="field.fieldName" />
                  </VCol>
                </template>
                <template v-if="field.type.toLowerCase() === 'checkbox'">
                  <VCol cols="12">
                    <VCheckbox v-model="formData.material_data[field.fieldName.toLowerCase()]"
                      :rules="[requiredValidator]" :label="field.fieldName" />
                  </VCol>
                </template>
              </template>
            </VRow>

            <div class="text-center mt-5">
              <VBtn class="mx-3" type="reset" variant="outlined" @click="closeNavigationDrawer">
                Cancel
              </VBtn>
              <VBtn :loading="loadings[0]" color="primary" class="mx-3" :disabled="isFormValid === false" type="submit">
                Create
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
