<script setup>
import StockMaterialEdit from './RequestMaterialEdit.vue';

const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

// 👉 Clients
const clients = ref([])

// 👉 Add item function
const addItem = () => {

  // eslint-disable-next-line vue/no-mutating-props
  props.data.purchasedProducts.push({
    title: 'App Design',
    cost: 24,
    hours: 1,
    description: 'Designed UI kit & app pages.',
  })
}

const removeProduct = id => {

  // eslint-disable-next-line vue/no-mutating-props
  props.data.purchasedProducts.splice(id, 1)
}
</script>

<template>
  <div class="mx-5">
    <!-- SECTION Header -->
    <!--  eslint-disable vue/no-mutating-props -->
    <VCardText>
      <VRow>
        <VCol
          xs="12"
        >      
          <div class="mt-4 ma-sm-4">
            <span class="me-3 mb-2">Select Supplier</span>
            <span>
              <VSelect
                v-model="props.data.invoice.issuedDate"
                :items="['Akumfi Juice Ltd', 'Kasapreko Ltd']"
              />
            </span>
          </div>
        </VCol>
        <VCol
          cols="12"
          lg="6"
          md="6"
          sm="6"
          xs="12"
        >      
          <div class="mt-4 ma-sm-4">
            <span class="me-3 mb-2">Waybill Number</span>
    
            <span>
              <VTextField
                v-model="props.data.invoice.issuedDate"
              />
            </span>
          </div>
        </VCol>
        <VCol
          cols="12"
          lg="6"
          md="6"
          sm="6"
          xs="12"
        >      
          <div class="mt-4 ma-sm-4">
            <span class="me-3 mb-2">Driver's Name</span>
    
            <span>
              <VTextField
                v-model="props.data.invoice.issuedDate"
              />
            </span>
          </div>
        </VCol>
        <VCol
          cols="12"
          lg="6"
          md="6"
          sm="6"
          xs="12"
        >      
          <div class="mt-4 ma-sm-4">
            <span class="me-3 mb-2">Phone Number</span>
    
            <span>
              <VTextField
                v-model="props.data.invoice.issuedDate"
              />
            </span>
          </div>
        </VCol>
      </VRow>
    </VCardText>

    <VDivider />

    <VCardText class="add-products-form">
      <VCardText>
        <h3 class="my-4">
          Consignment Details
        </h3>
      </VCardText>

      <div
        v-for="(product, index) in props.data.purchasedProducts"
        :key="product.title"
        class="ma-sm-4"
      >
        <StockMaterialEdit
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
    </VCardText>

    <VDivider />

    <VCardText class="mx-sm-4">
      <p class="font-weight-semibold mb-2">
        Leave Note:
      </p>
      <VTextarea
        v-model="props.data.note"
        :rows="2"
      />
    </VCardText>
  </div>
</template>
