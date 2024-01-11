<script setup>
const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: () => {},
  },
  editing: {
    type: Boolean,
    default: () => false,
  },
  formId: {
    type: String,
    default: () => {},
  },
});


const computedFields = computed(() => {
  return props.fields
})

function removeFormItem(index) {
  computedFields.value.splice(index, 1)
}

const formatPlaceHolder = fieldName => {
  return `Enter ${fieldName}`
}
</script>

<template>
  <div v-if="computedFields.length">
    <div
      v-for="(item, index) in computedFields"
      :key="index"
      class="d-flex mb-2"
    >
      <VCol
        cols="12"
        md="6"
        class="pa-0"
      >
        <div
          v-if="item.type === 'Text Field'"
          class="relative"
        >
          <span class="d-flex flex items-center relative text-sm text-capitalize mb-1">{{ item.fieldName }}
            <span
              class="remove-option mx-4"
              @click="removeFormItem(index)"
            >
              <VIcon
                size="14"
                icon="tabler-x"
              />
            </span>
          </span>
          <VTextField
            v-if="item.textFieldType === 'Text'"
            :label="item.fieldName"
            :placeholder="formatPlaceHolder(item.fieldName)"
            :type="item.textFieldType || 'text'"
          />
          <VTextField
            v-if="item.textFieldType === 'Time'"
            :label="item.fieldName"
            :placeholder="formatPlaceHolder(item.fieldName)"
            :type="item.textFieldType || 'text'"
          />
          <VTextField
            v-if="item.textFieldType === 'Number'"
            :label="item.fieldName"
            :placeholder="formatPlaceHolder(item.fieldName)"
            :type="item.textFieldType || 'text'"
          />
          <AppDateTimePicker
            v-if="item.textFieldType === 'Date'"
            density="compact"
            placeholder="Enter YYYY-MM-DD"
          />
        </div>
        <div
          v-if="item.type === 'Text Area'"
          class="relative"
        >
          <span class="d-flex flex items-center relative text-sm text-capitalize mb-1">{{ item.fieldName }}
            <span
              class="remove-option mx-4"
              @click="removeFormItem(index)"
            >
              <VIcon
                size="16"
                icon="tabler-x"
              />
            </span>
          </span>
          <VTextarea
            rows="2"
            :label="item.fieldName"
            :placeholder="formatPlaceHolder(item.fieldName)"
          />
        </div>
        <div
          v-if="item.type === 'DropDown'"
          class=""
        >
          <span class="d-flex flex items-center relative text-sm text-capitalize mb-1">{{ item.fieldName }}
            <span
              class="remove-option mx-4"
              @click="removeFormItem(index)"
            >
              <VIcon
                size="16"
                icon="tabler-x"
              />
            </span>
          </span>
          <VSelect
            v-if="item.type === 'DropDown'"
            density="compact"
            :items="item.selectItems"
            :placeholder="formatPlaceHolder(item.fieldName)"
          />
        </div>
      </VCol>
    </div>
    <div
      class="d-flex justify-end pa-4"
      style="align-items: center;"
    />
  </div>
</template>

<style lang="scss" scoped>
.remove-option {
  cursor: pointer;
}
</style>
