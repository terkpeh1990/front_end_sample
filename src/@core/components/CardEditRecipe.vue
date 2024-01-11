<script setup>
import RecipeEdit from '@/views/production/forms/RecipeEdit.vue';
import RecipeHistory from '@/@core/components/RecipeHistory.vue';
import { requiredValidator } from '@validators';
import { useRecipeStore } from '@/stores'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  data: { type: Object, default: () => {} },
})

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
  'recipeData',
])


const { createRecipe } = useRecipeStore()


const message = inject('showToaster')


const formData = computed(() => props.data)

const refForm = ref()
const isFormValid = ref(false)

const loadings = ref([])

const tabs = [
  {
    title: 'Edit Recipe',
    tab: '0',
  },
  {
    title: 'History',
    tab: '1',
  },
]

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const addItem = () => {

  formData.data.value.ingrediants = [...formData.value.data.ingrediants, {
    quantity: '',
    ingrediant: '',
  }]
}

const removeProduct = id => {

  // eslint-disable-next-line vue/no-mutating-props
  formData.value.data.ingrediants.splice(id, 1)
}

const formSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        loadings.value[0] = true

        const res = {
          status: 0,
        }


        // const res = await createRecipe(formData.value.data)
        if (res.status === 201) {
          emit('recipeData')
          message('Successfully updated', 'success')
          dialogModelValueUpdate(false)
        } else {
          loadings.value[0] = false
          message('Failed to update recipe', 'error')
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
    height="800"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-5 pa-sm-15">
      <VTabs
        v-model="activeTab"
        class="mb-5"
      >
        <template
          v-for="item in tabs"
          :key="item.title"
        >
          <VTab
            :value="item.tab"
          >
            {{ item.title }}
          </VTab>
        </template>
      </VTabs>
      <VWindow
        v-model="activeTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem value="0">
          <VCardText class="pt-6">
            <VForm
              ref="refForm"
              v-model="isFormValid"
              @submit.prevent="formSubmit"
            >
              <VRow>
                <VCol cols="12">
                  <VTextField
                    v-model="formData.data.name"
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
                  v-for="(product, index) in formData.data.ingrediants"
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
                    v-model="formData.data.notes"
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
                    Update
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
        </VWindowItem>
        <VWindowItem value="1">
          <VCardText class="pt-6">
            <RecipeHistory />
          </VCardText>
        </VWindowItem>
      </VWindow>
    </VCard>
  </VDialog>
</template>
