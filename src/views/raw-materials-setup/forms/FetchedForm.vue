<script setup>
import { useDropdowns } from '@/@core/composable/useDropdown';
import { useRawMaterialsStore } from '@/stores';
import {
  requiredValidator,
} from '@validators';

const { brands, categories } = useDropdowns();


const materialStore = useRawMaterialsStore()

const formFields = ref([])

const fetchMaterialFormFields = async () => {
  const res = await materialStore.fetchRawMaterialsForm()

  if(res && res.status === 200) {
    formFields.value = JSON.parse(res.data.data[0].materialform_data.formFields)
  }
}

watchEffect(fetchMaterialFormFields)

const staticFields = ref([
  {
    type: 'DropDown',
    fieldName: 'Brands',
    selectItems: brands,
  },
  {
    type: 'DropDown',
    fieldName: 'Categories',
    selectItems: categories,
  },
])


const refForm = ref()
const isFormValid = ref(false)
const formData = ref({})

formFields.value.forEach(field => {
  formData.value[field.fieldName.toLowerCase()] = ''
})


const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loadings.value[0] = true
      console.log({ ...formData.value });

      const { categories, brands } = formData.value;

      const dataToSend = { 
        company_id: currentUser.value.company_id,
        category_id: categories.id,
        brand_id: brands.id,
        material_data: { 
          ...formData.value,
          categories: {
            name: categories.name,
            id: categories.id,
          },
          brands: {
            brand_name: brands.brand_name,
            id: brands.id,
          },
        },
      }

      console.log('dataToSend', dataToSend);

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
</script>

<template>
  <VForm
    ref="refForm"
    v-model="isFormValid"
    @submit.prevent="onSubmit"
  >
    <VRow>
      <template
        v-for="field in formFields"
        :key="field.id"
      >
        <template v-if="field.type.toLowerCase() === 'text field'">
          <VCol
            v-if="field.textFieldType === 'Date'"
            cols="12"
          >
            <AppDateTimePicker
              v-model="formData[field.fieldName.toLowerCase()]"
              :rules="[requiredValidator]"
              density="compact"
              :placeholder="`${field.fieldName} YYYY-MM-DD`"
            />
          </VCol>
          <VCol
            v-else
            cols="12"
          >
            <VTextField
              v-model="formData[field.fieldName.toLowerCase()]"
              :rules="[requiredValidator]"
              :label="field.fieldName"
            />
          </VCol>
        </template>
        <template v-if="field.type.toLowerCase() === 'dropdown'">
          <VCol cols="12">
            <VSelect
              v-model="formData[field.fieldName.toLowerCase()]"
              :rules="[requiredValidator]"
              :label="field.fieldName"
              :items="field.selectItems"
            />
          </VCol>
        </template>
        <template v-if="field.type.toLowerCase() === 'text area'">
          <VCol cols="12">
            <VTextarea
              v-model="formData[field.fieldName.toLowerCase()]"
              :rules="[requiredValidator]"
              :label="field.fieldName"
            />
          </VCol>
        </template>
        <template v-if="field.type.toLowerCase() === 'checkbox'">
          <VCol cols="12">
            <VCheckbox
              v-model="formData[field.fieldName.toLowerCase()]"
              :rules="[requiredValidator]"
              :label="field.fieldName"
            />
          </VCol>
        </template>
      </template>
      <template
        v-for="sField in staticFields"
        :key="sField.fieldName"
      >
        <VCol>
          <VSelect
            v-model="formData[sField.fieldName.toLowerCase()]"
            :rules="[requiredValidator]"
            :label="sField.fieldName"
            :items="sField.selectItems"
            :item-title="sField.fieldName === 'Categories' ? 'name' : 'brand_name'"
            item-value="id"
            return-object
          />
        </VCol>
      </template>
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
        color="primary"
        class="mx-3"
        :disabled="isFormValid === false"
        type="submit"
      >
        Create
      </VBtn>
    </div>
  </VForm>
</template>
