<!-- eslint-disable vue/no-mutating-props -->
<script setup>
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
      notes: '',
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

const data = computed(() => props.data)

const materials = ref([])
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
          <VSelect
            v-model="data.name"
            disabled
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
            v-model="data.batchNumber"
            disabled
            :rules="[requiredValidator]"
            label="Batch Number"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="data.quantity"
            :rules="[requiredValidator]"
            type="number"
            disabled
            label="Quantity"
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="data.approved_quantity"
            :rules="[requiredValidator]"
            type="number"
            label="Approved Quantity"
            class="mb-3"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <AppDateTimePicker
            v-model="data.expiring_date"
            disabled
            :rules="[requiredValidator]"
            label="Expiry Date"
          />
        </VCol>
        <VCol
          cols="12"
        >
          <VTextarea
            v-if="parseInt(data.approved_quantity) < parseInt(data.quantity)"
            v-model="data.notes"
            class="mt-5"
            :rules="[requiredValidator]"
            label="Reason"
          />
        </VCol>
      </VRow>
    </div>
  </VCard>
</template>
