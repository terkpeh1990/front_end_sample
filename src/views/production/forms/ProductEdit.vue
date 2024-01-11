<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { useRawMaterialsStore } from '@/stores';
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
      quantity: '',
      packaging_material: '',
      pakaged_unit: '',
    }),
  },
})

const emit = defineEmits([
  'removeProduct',
  'totalAmount',
])


const data = computed(() => props.data)

const { fetchRawMaterials } = useRawMaterialsStore()

const materialData = ref([])

const useDropdown = async () => {
  const materials = await fetchRawMaterials()
  let data = materials.data.filter(material => material.category_id?.name?.toLowerCase().includes('pack'))

  materialData.value = data
}

const removeProduct = () => {
  emit('removeProduct', props.id)
}

watchEffect(() => useDropdown())
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <VCard
    flat
    class="d-flex flex-row"
  >
    <div class="pa-2 flex-grow-1">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <VAutocomplete
            v-model="data.packaging_material"
            :rules="[requiredValidator]"
            :items="materialData"
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
