<script setup>
import StockMaterialUpdate from '@/views/raw-materials-setup/forms/StockMaterialUpdate.vue';
import { requiredValidator } from '@validators';
import { useRestockStore } from '@/stores'

const props = defineProps({
  data: { type: Array, required: true },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
  'approvedData',
])

const route = useRoute()


const message = inject('showToaster')


const dialogModelValueUpdate = (val, refetch = false) => {
  console.log('emit', val, refetch)
  emit('update:isDialogVisible', { val, refetch })
}

const approveStock = async id => {
  const res = await store.approveStock(id)

  if (res.status === 200) {
    message('Successfully approved stock', 'success')
    dialogModelValueUpdate(false, true)

    await fetchSingleStock()
  }else {
    message('Failed to approved stock', 'error')
  }
}

const consignment_details = ref(structuredClone(toRaw(props.data)))

const store = useRestockStore()

const formData = ref({
  ingrediants: [],
})

const refForm = ref()
const isFormValid = ref(false)

const loadings = ref([])

const removeProduct = id => {

  // eslint-disable-next-line vue/no-mutating-props
  formData.value.ingrediants.splice(id, 1)
}

const formSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if(valid) {
      try{
        loadings.value[0] = true

        const res = await store.editStock(route.params.id, consignment_details.value)

        if (res.status === 200) {
          await approveStock(route.params.id)
        } else {
          loadings.value[0] = false
          message('Failed to Approve Stock', 'error')
        }
      }
      catch(e) {
        loadings.value[0] = false
      }
    }
  })
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-5 pa-sm-15">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 font-weight-medium mb-4">
          Approve Stock
        </VCardTitle>
      </VCardItem>

      <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="formSubmit"
      >
        <VRow>      
          <VCol
            v-for="(product, index) in consignment_details"
            :key="product.title"
            cols="12"
            class="ma-sm-4"
          >
            <StockMaterialUpdate
              :id="index"
              :data="product"
              @remove-product="removeProduct"
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
              Proceed
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
    </VCard>
  </VDialog>
</template>
