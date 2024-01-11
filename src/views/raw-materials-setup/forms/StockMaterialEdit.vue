<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { useDropdowns } from '@/@core/composable/useDropdown';
import { useRawMaterialsStore } from '@/stores'
import { groupBy } from '@/@core/utils'
import {
  requiredValidator,
} from '@validators'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
    default: () => ({
      approved_quantity: '',
      category: '',
      id: '',
      quantity: '',
      name: '',
      batchNumber: '',
      brand_name: '',
      brand_id: '',
      expiring_date: '',
    }),
  },
})

const emit = defineEmits([
  'removeProduct',
  'totalAmount',
])

const { validateBatchNumber } = useRawMaterialsStore()
const data = computed(() => props.data)

const { brands, fetchMaterialsForCategory, materials } = useDropdowns();


const id = ref('')

const batchNumber = ref('')

const batchMessage = ref('')

let searchTimer

watch(batchNumber, (newVal, _) => {
  data.value.batchNumber = newVal
  let res
  clearTimeout(searchTimer)
  searchTimer = setTimeout(async () => {
    res = await validateBatchNumber(newVal)
    batchMessage.value = res.data.message
  }, 500)
})

watch(id, ({ name, id, brand_id, category_id }) => {
  data.value.name = name
  data.value.id = id
  data.value.brand_name = brands.value.filter(brand => brand.id === brand_id)[0]?.brand_name ?? null
  data.value.brand_id = brand_id
  data.value.category = category_id
})

const removeProduct = () => {
  emit('removeProduct', props.id)
}
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <VAutocomplete
            v-model="id"
            :rules="[requiredValidator]"
            :items="materials"
            label="Select Material"
            item-title="name"
            item-value="id"
            class="mb-3"
            return-object
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="batchNumber"
            :rules="[requiredValidator]"
            label="Batch Number"
          />
          <small
            v-if="batchMessage"
            class="primary"
          >{{ batchMessage }}</small>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="data.quantity"
            :rules="[requiredValidator]"
            type="number"
            label="Quantity"
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <AppDateTimePicker
            v-model="data.expiring_date"
            :rules="[requiredValidator]"
            label="Expiry Date"
          />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-center border-s pa-1">
      <VBtn
        icon
        size="x-small"
        color="default"
        variant="text"
        @click="removeProduct"
      >
        <VIcon
          size="20"
          icon="tabler-x"
        />
      </VBtn>
    </div>
  </VCard>
</template>
