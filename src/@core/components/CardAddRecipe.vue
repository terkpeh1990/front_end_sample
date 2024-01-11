<script setup>
import RecipeEdit from '@/views/production/forms/RecipeEdit.vue';
import { requiredValidator } from '@validators';
import { useRecipeStore } from '@/stores'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
  'recipeData',
])

const { createRecipe } = useRecipeStore()

const message = inject('showToaster')

const formData = ref({
  name: '',
  notes: '',
  ingrediants: [],
})

const refForm = ref()
const isFormValid = ref(false)

const loadings = ref([])

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const addItem = () => {

  formData.value.ingrediants = [...formData.value.ingrediants, {
    quantity: '',
    ingrediant: '',
  }]
}

const removeProduct = id => {

  // eslint-disable-next-line vue/no-mutating-props
  formData.value.ingrediants.splice(id, 1)
}

const formSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        loadings.value[0] = true

        const res = await createRecipe(formData.value)
        if (res.status === 201) {
          emit('recipeData')
          message('Successfully added a new recipe', 'success')
          dialogModelValueUpdate(false)
        } else {
          loadings.value[0] = false
          message('Failed to add new recipe', 'error')
        }
      }
      catch (e) {
        loadings.value[0] = false
      }
    }
  })
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

    <VCard class="pa-5 pa-sm-15">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 font-weight-medium mb-4">
          Add New Recipe
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-6">
        <VForm
          ref="refForm"
          v-model="isFormValid"
          @submit.prevent="formSubmit"
        >
          <VRow>
            <!-- 👉 Card Number -->
            <VCol cols="12">
              <VTextField
                v-model="formData.name"
                class="mt-5"
                :rules="[requiredValidator]"
                label="Enter Recipe Name"
              />
            </VCol>

            <VCardText>
              <h3 class="my-2">
                Ingredients
              </h3>
            </VCardText>

            <div
              v-for="(product, index) in formData.ingrediants"
              :key="product.title"
              class="ma-sm-4 w-100"
            >
              <RecipeEdit
                :id="index"
                :data="product"
                @remove-product="removeProduct"
              />
            </div>

            <div class="mt-4 ma-sm-4">
              <VBtn @click="addItem">
                Add Item
              </VBtn>
            </div>
            <VCol cols="12">
              <VTextarea
                v-model="formData.notes"
                class="mt-5"
                :rules="[requiredValidator]"
                label="Notes"
              />
            </VCol>
            <VCol
              cols="12"
              class="text-center"
            >
              <VBtn
                class="me-3"
                :loading="loadings[0]"
                :disabled="isFormValid === false"
                type="submit"
              >
                Submit
              </VBtn>
              <VBtn
                color="secondary"
                variant="tonal"
                @click="$emit('update:isDialogVisible', false)"
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
