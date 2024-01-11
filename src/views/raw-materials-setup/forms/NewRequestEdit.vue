<!-- eslint-disable vue/no-mutating-props -->
<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: 'App Design',
      cost: 24,
      hours: 1,
      description: 'Designed UI kit & app pages.',
    }),
  },
})

const emit = defineEmits([
  'removeProduct',
  'totalAmount',
])

const newRequests = [
  {
    title: 'App Design',
    cost: 24,
    hours: 1,
    description: 'Designed UI kit & app pages.',
  },
]

const isRawMaterial = ref(true)

const itemsOptions = [
  {
    title: 'Sugar',
    cost: 24,
    hours: 1,
    description: 'Designed UI kit & app pages.',
  },
  {
    title: 'Salt',
    cost: 26,
    hours: 1,
    description: 'Customization & Bug Fixes.',
  },
  {
    title: 'Citric',
    cost: 28,
    hours: 1,
    description: 'Vuetify admin template.',
  },
]

const selectedItem = ref()

watch(selectedItem, () => {
  props.data.cost = structuredClone(toRaw(selectedItem.value.cost))
  props.data.hours = structuredClone(toRaw(selectedItem.value.hours))
  props.data.description = structuredClone(toRaw(selectedItem.value.description))
  props.data.title = structuredClone(toRaw(selectedItem.value.title))
})

newRequests.push({
  title: 'App Design',
  cost: 24,
  hours: 1,
  description: 'Designed UI kit & app pages.',
})


const removeProduct = () => {
  emit('removeProduct', props.id)
}

const totalPrice = computed(() => Number(props.data.cost) * Number(props.data.hours))

watch(totalPrice, () => {
  emit('totalAmount', totalPrice.value)
}, { immediate: true })
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="add-products-header mb-2 d-none d-md-flex">
    <div
      v-for="product in newRequests"
      :key="product.title"
      class="ma-sm-4"
    >
      <VRow class="font-weight-medium px-4">
        <VCol
          cols="12"
          md="6"
        >
          <span class="d-flex align-center text-sm">
            {{ isRawMaterial ? 'Ingredients' : 'Packaging' }} <span class="mx-3"> 
              <VSwitch v-model="isRawMaterial" />
            </span>
          </span>
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <span class="text-sm">
            Quantity
          </span>
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <span class="text-sm">
            Batch Number
          </span>
        </VCol>
      </VRow>
    </div>
  </div>

  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <VSelect
            v-model="selectedItem"
            :items="itemsOptions"
            label="Select Item"
            return-object
            class="mb-3"
          />
        </VCol>
        <VCol
          cols="12"
          md="3"
          sm="4"
        >
          <VTextField
            v-model="props.data.cost"
            type="number"
            label="Quantity"
          />
        </VCol>
        <VCol
          cols="12"
          md="3"
          sm="4"
        >
          <VTextField
            v-model="props.data.hours"
            label="Batch Number"
          />
        </VCol>
        <VCol
          v-if="!isRawMaterial"
          cols="12"
          md="6"
        >
          <VSelect
            v-model="selectedItem"
            :items="itemsOptions"
            label="Select Brand"
            return-object
            class="mb-3"
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
