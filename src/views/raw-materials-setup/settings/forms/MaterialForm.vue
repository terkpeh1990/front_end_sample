<script setup>
import { useFormComposable } from '@/@core/composable/useCreateForm';
import { useRawMaterialsStore } from '@/stores';
import {
  requiredValidator,
} from '@validators';
import { inject } from 'vue';
import Loader from "../../../../pages/components/Loader.vue";
import FormTypes from './FormTypes.vue';

const CONSTANTS = {
  TEXT_FIELD: 'Text Field',
  TEXT_AREA: 'Text Area',
  DROPDOWN: 'DropDown',
}

const materialStore = useRawMaterialsStore();

const refForm = ref()
const fieldName = ref('')
const type = ref('')
const textFieldType = ref('')
const isRequired = ref(true)
const isFormValid = ref(false)
const fetching = ref(false)
const formFields = ref([])
const createdFields = ref([])
const dropdownOptions = ref([])
const selectVal = ref()

const isEditing = ref(false)
const formId = ref("")

const message = inject('showToaster');


const fetchMaterialFormFields = async () => {
  fetching.value = true;

  const res = await materialStore.fetchRawMaterialsForm()
  if (res.data.data.length !== 0) {

    isEditing.value = true
    formId.value = res.data.data[0].id
    
    const parsedObj = JSON.parse(res.data.data[0].materialform_data.formFields)
    
    createdFields.value = [...parsedObj, ...createdFields.value]
  } else {
    isEditing.value = false
  }
  fetching.value = false;
}

watchEffect(fetchMaterialFormFields)

const { loading, sendForm } = useFormComposable({ type: 'material', formId: formId, fields: createdFields, editing: isEditing })

function removeForm() {
  createdFields.value = []
  refForm.value?.reset()
}

function appendFormItem(key) {
  type.value = key;

  const new_item = {
    id: Math.random(),
    type: key,
    fieldName: '',
    isRequired: true,
  }
  
  formFields.value.length === 1 ? null : formFields.value.push(new_item)
}
function removeFormItem(index) {
  formFields.value.splice(index, 1)
  refForm.value?.reset()
}


function removeOption(index) {
  dropdownOptions.value.splice(index, 1)
}
function addToSelect() {
  dropdownOptions.value.includes(selectVal.value) ? message('option already exists', 'error') : dropdownOptions.value.push(selectVal.value);
  selectVal.value = '';
}


function onSubmit(){
  const new_item = {
    id: Math.random(),
    type: type.value,
    fieldName: fieldName.value,
    textFieldType: textFieldType.value || 'Text',
    isRequired: isRequired.value,
    selectItems: dropdownOptions.value || [],
  }
 
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      if(type.value === 'DropDown' && !dropdownOptions?.value?.length){
        message('add option for dropdown', 'error')
      } else {
        createdFields.value.some(item => item.fieldName === new_item.fieldName) ? message('form item already exists', 'error') : createdFields.value.push(new_item)
        nextTick(() => {
          refForm.value?.reset()
          dropdownOptions.value = []
        })
      }
    }
  })
}
</script>


<template>
  <VRow>
    <VCol
      cols="12"
      md="9"
    >
      <VCard
        class="overflow-y-auto mt-2"
      >
        <VCardText class="">
          <div class="mb-10">
            <div
              v-if="fetching"
              class="empty_state mt-10 mb-10"
            >
              <Loader />
            </div>
            <VCardText
              v-if="createdFields.length === 0"
              class="empty-area border-dashed rounded"
            >
              <VCardTitle class="text-center">
                No Material Form Found
              </VCardTitle>
              <VCardSubtitle class="text-center">
                Create a form to see it here.
              </VCardSubtitle>
            </VCardText>
            <template v-else>
              <FormTypes
                :fields="createdFields"
                type="material"
                :editing="isEditing"
                :form-id="formId"
              />
              <div class="d-flex justify-end">
                <VBtn
                  type="button"
                  variant="outlined"
                  color="error"
                  @click="removeForm"
                >
                  Remove all
                </VBtn>
              </div>
            </template>
            <div class="mt-2">
              <VBtn
                :loading="loading"
                type="button"
                variant="outlined"
                @click="sendForm"
              >
                Save Form
              </VBtn>
            </div>
          </div>
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <div>
              <VCardText
                v-if="formFields.length === 0"
                class="empty-area border-dashed rounded"
              >
                <VCardSubtitle class="text-center">
                  <span
                    class="pa-3"
                  >
                    <VIcon
                      color="success"
                      size="16"
                      icon="tabler-plus"
                    />
                  </span>
                  Click on the right to append a form
                </VCardSubtitle>
              </VCardText>
              <VCard
                v-for="(formItem, index) in formFields"
                :key="index"
                flat
                border
                class="d-flex flex-row mt-5"
              >
                <div class="pa-5 flex-grow-1">
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextarea
                        v-model="fieldName"
                        rows="2"
                        label="Field Name"
                        placeholder="Enter Field Name"
                        :rules="[requiredValidator]"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="2"
                      sm="4"
                    >
                      <VLabel for="is-required">
                        Required
                      </VLabel>
                      <div>
                        <VSwitch
                          id="is-required"
                          v-model="isRequired"
                        />
                      </div>
                    </VCol>
                    <VCol
                      cols="12"
                      md="4"
                      sm="4"
                    >
                      <VSelect
                        v-if="type === 'Text Field'"
                        v-model="textFieldType"
                        label="Text Field Type"
                        class="mb-3"
                        :items="['Number', 'Date', 'Time', 'Text']"
                      />
                    </VCol>
                  </VRow>

                  <VRow
                    v-if="type === 'DropDown'"
                    class="select-options-wrap mt-4"
                  >
                    <div class="left-input-area d-flex items-center">
                      <div class="input-wrap d-flex">
                        <input
                          v-model="selectVal"
                          type="text"
                          class="input-field"
                        >
                      </div>
                                        
                      <VBtn
                        :disabled="selectVal?.length < 1"
                        size="x-small"
                        color="default"
                        @click="addToSelect"
                      >
                        Add
                      </VBtn>
                    </div>
                    <div class="d-flex gap-4 pa-2 border-s">
                      <div
                        v-for="(option, j) in dropdownOptions"
                        :key="option"
                        class="text-capitalize relative mx-2"
                      >
                        <VChip
                          label
                          size="small"
                          class="text-capitalize"
                        >
                          {{ option }}
                        </VChip>
                        <span
                          class="remove-option"
                          @click="removeOption(j)"
                        >
                          <VIcon
                            size="16"
                            icon="tabler-x"
                          />
                        </span>
                      </div>
                    </div>
                  </VRow>

                  <VRow
                    class="justify-space-between pa-5"
                    style="align-items: center;"
                  >
                    <VBtn
                      prepend-icon="tabler-plus"
                      type="submit"
                      variant="outlined"
                    >
                      Add Field
                    </VBtn>
                    <VChip
                      label
                      size="small"
                      class="text-capitalize mt-4"
                    >
                      {{ type }}
                    </VChip>
                  </VRow>
                </div>
  
                <!-- 👉 Item Actions -->
                <div class="d-flex flex-column justify-space-between border-s pa-1">
                  <VBtn
                    icon
                    size="x-small"
                    color="default"
                    variant="text"
                    @click="removeFormItem(index)"
                  >
                    <VIcon
                      size="20"
                      icon="tabler-x"
                    />
                  </VBtn>
                </div>
              </VCard>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="3"
      class="constants"
    >
      <VCard class="mb-8 mt-2">
        <VCardTitle class="text-center pa-5">
          Create Raw materials Form
        </VCardTitle>
        <VDivider />
        <VCardText>
          <VBtn
            v-for="[key, val] in Object.entries(CONSTANTS)"
            :key="key"
            block
            class="mb-2"
            color="default"
            variant="tonal"
            @click="appendFormItem(val)"
          >
            {{ val }}
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" src="./style.scss" scoped>
</style>
