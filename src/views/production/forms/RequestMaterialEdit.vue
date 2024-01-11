<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { useDropdowns } from '@/@core/composable/useDropdown';
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
      quantity: '500',
      material: 'Laminate 70g',
    }),
  },
})

const emit = defineEmits([
  'removeProduct',
  'totalAmount',
])

const data = computed(() => props.data)

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
          <VSelect
            v-model="data.material"
            :rules="[requiredValidator]"
            :items="[]"
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
            v-model="data.quantity"
            :rules="[requiredValidator]"
            type="number"
            label="Quantity"
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
