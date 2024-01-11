<script setup>
import { getUser } from '@/@core/services/JwtService';
import { useRestockStore, useSupplierStore } from '@/stores';
import StockMaterialEdit from '../forms/StockMaterialEdit.vue';
import CardAddSupplier from '@/@core/components/CardAddSupplier.vue';
import {
  requiredValidator,
} from '@validators';

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  title: { type: String, default: () => "Add New Stock" },
  data: { type: Array, required: true },
})


const emit = defineEmits([
  'update:isDrawerOpen',
  'stockData',
])

const isSupplierDialogVisible = ref(false)

const triggerDialog = val => {
  isSupplierDialogVisible.value = val
}

const message = inject('showToaster')
const currentUser = computed(() => getUser())

const supplierStore = useSupplierStore()
const stockStore = useRestockStore()

const isFormValid = ref(false)
const refForm = ref()
const formTitle = computed(() => props.title)

const formData = ref({
  restock_info: {
    supplier: '',
    waybillNumber: '',
    driverName: '',
    phoneNumber: '',
    restock_date: '',
  },
  consignment_details: [],
  note: '',
  status: 'Pending',
})

const suppliersOption = ref([])

const fetchSuppliers = async () => {
  const res = await supplierStore.fetchAllSuppliers()

  suppliersOption.value = res.data
}

watchEffect(fetchSuppliers)

const addItem = () => {

  formData.value.consignment_details = [...formData.value.consignment_details, {
    category: '',
    id: '',
    quantity: '',
    approved_quantity: '',
    name: '',
    batchNumber: '',
    brand_name: '',
    brand_id: '',
    expiring_date: '',
  }]
}

const removeProduct = id => {

  // eslint-disable-next-line vue/no-mutating-props
  formData.value.consignment_details.splice(id, 1)
}

const loadings = ref([])

const items = [
  'data',
  'summary',
]

const currentTab = ref(1)
const totalTabs = items.length

// 👉 drawer close
const closeNavigationDrawer = () => {
  loadings.value[0] = false
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    currentTab.value -= 1
    formData.value = {
      restock_info: {
        supplier: '',
        waybillNumber: '',
        driverName: '',
        phoneNumber: '',
        restock_date: '',
      },
      consignment_details: [],
      note: '',
      status: 'Pending',
    }
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}


const processData = async () => {
  refForm.value?.validate().then( async ({ valid }) => {
    if (valid && currentTab.value !== totalTabs) {
      currentTab.value += 1
    }
  })
}

const submit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      loadings.value[0] = true

      const res = await stockStore.createNewStock({ ...formData.value, company_id: JSON.parse(currentUser.value.company_id) })
      if (res.status === 201) {
        message('Successfully added a new material', 'success')
        emit("stockData")
        closeNavigationDrawer()
      }else {
        loadings.value[0] = false
        message('Failed to add new material', 'error')
      }
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="800"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <VForm
      ref="refForm"
      v-model="isFormValid"
      class="overflow-auto"
      @submit.prevent="submit"
    >
      <div class="d-flex align-center pa-6 pb-1 bg-tonal">
        <h6 class="text-h6">
          {{ formTitle }}
        </h6>

        <VSpacer />
        <div v-if="currentTab === 1">
          <VBtn
            variant="outlined"
            class="mx-2"
            @click="isSupplierDialogVisible = true"
          >
            <VIcon
              size="18"
              icon="tabler-plus"
            />
            Add Supplier
          </VBtn>
          <VBtn
            color="primary"
            class="mx-2"
            @click="processData"
          >
            <VIcon
              size="18"
              icon="tabler-arrow-right"
            />
            Next
          </VBtn>
        </div>
        <div v-else>
          <VBtn
            color="primary"
            class="mx-2"
            @click="currentTab -= 1"
          >
            <VIcon
              size="18"
              icon="tabler-arrow-left"
            />
            Previous
          </VBtn>
          <VBtn
            variant="outlined"
            class="mx-2"
            :loading="loadings[0]"
            type="submit"
          >
            <VIcon
              size="18"
              icon="tabler-check"
            />
            Submit
          </VBtn>
        </div>
      </div>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in items.length"
          :key="item"
          :value="item"
        >
          <div v-if="currentTab === 1">
            <VRow>
              <VCol
                cols="12"
                md="12"
              >
                <div class="mx-5">
                  <!-- SECTION Header -->
                  <!--  eslint-disable vue/no-mutating-props -->
                  <VCardText>
                    <VRow>
                      <VCol
                        xs="12"
                      >      
                        <div class="mt-1 ma-sm-4">
                          <VSelect
                            v-model="formData.restock_info.supplier"
                            label="Select Supplier"
                            :rules="[requiredValidator]"
                            :items="suppliersOption"
                            item-title="name"
                            item-value="id"
                            return-object
                          />
                        </div>
                      </VCol>
                      <VCol
                        cols="12"
                        lg="6"
                        md="6"
                        sm="6"
                        xs="12"
                      >      
                        <div class="mt-1 ma-sm-4">
                          <VTextField
                            v-model="formData.restock_info.waybillNumber"
                            :rules="[requiredValidator]"
                            label="Waybill Number"
                          />
                        </div>
                      </VCol>
                      <VCol
                        cols="12"
                        lg="6"
                        md="6"
                        sm="6"
                        xs="12"
                      >      
                        <div class="mt-1 ma-sm-4">
                          <VTextField
                            v-model="formData.restock_info.driverName"
                            :rules="[requiredValidator]"
                            label="Driver's Name"
                          />
                        </div>
                      </VCol>
                      <VCol
                        cols="12"
                        lg="6"
                        md="6"
                        sm="6"
                        xs="12"
                      >      
                        <div class="mt-1 ma-sm-4">
                          <VTextField
                            v-model="formData.restock_info.phoneNumber"
                            :rules="[requiredValidator]"
                            label="Driver's Phone Number"
                          />
                        </div>
                      </VCol>
                      <VCol
                        cols="12"
                        lg="6"
                        md="6"
                        sm="6"
                        xs="12"
                      >      
                        <div class="mt-1 ma-sm-4">
                          <AppDateTimePicker
                            v-model="formData.restock_info.restock_date"
                            :rules="[requiredValidator]"
                            label="Restock Date"
                          />
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
  
                  <VDivider />
  
                  <VCardText class="add-products-form">
                    <VCardText>
                      <h3 class="my-2">
                        Consignment Details
                      </h3>
                    </VCardText>
  
                    <div
                      v-for="(product, index) in formData.consignment_details"
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
                      v-model="formData.note"
                      :rows="2"
                    />
                  </VCardText>
                </div>
              </VCol>
            </VRow>
          </div>
          <div v-else>
            <VCardText>
              <h4 class="text-center">
                Summary
              </h4>
              <div class="flex d-flex mt-4 ma-sm-4">
                <div class="mx-2">
                  <small>
                    Supplier
                  </small>
                  <p class="font-weight-medium">
                    {{ formData.restock_info.supplier.name }}
                  </p>
                  <small>
                    Waybill Number
                  </small>
                  <p class=" font-weight-medium mb-2">
                    <span class="font-weight-semibold">{{ formData.restock_info.waybillNumber }}</span>
                  </p>
                  <small>
                    Driver Name
                  </small>
                  <p class=" font-weight-medium mb-2">
                    <span class="font-weight-semibold">{{ formData.restock_info.driverName }}</span>
                  </p>
                </div>
                <VSpacer />
                <div class="mx-2">
                  <small>
                    Driver Phone Number
                  </small>
                  <p class="font-weight-medium">
                    {{ formData.restock_info.phoneNumber }}
                  </p>
                  <small>
                    Restock Date
                  </small>
                  <p class=" font-weight-medium mb-2">
                    <span class="font-weight-semibold">{{ formData.restock_info.restock_date }}</span>
                  </p>
                </div>
              </div>
              <VCardTitle>Consignment Details</VCardTitle>
              <VTable v-if="formData.consignment_details">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="text-center"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                    >
                      MATERIAL
                    </th>
                    <th
                      scope="col"
                    >
                      BATCH NUMBER
                    </th>
                    <th
                      scope="col"
                    >
                      EXPIRY DATE
                    </th>
                    <th
                      scope="col"
                      class="text-center"
                    >
                      QUANTITY
                    </th>
                  </tr>
                </thead>
    
                <tbody>
                  <tr
                    v-for="(material, i) in formData.consignment_details"
                    :key="material.id"
                  >
                    <td class="text-center">
                      {{ i + 1 }}
                    </td>
                    <td>
                      {{ material.name }}
                    </td>
                    <td>
                      {{ material.batchNumber }}
                    </td>
                    <td>
                      {{ material.expiring_date }}
                    </td>
                    <td class="text-center">
                      {{ material.quantity }}
                    </td>
                  </tr>
                </tbody>
              </VTable>
              <div
                v-else
                class="empty_state mt-5 text-center"
              >
                <img
                  src="@images/empy_state.svg"
                  alt=""
                >
                <p class="mt-0">
                  No Material eneterd
                </p>
              </div>
            </VCardText>
          </div>
        </VWindowItem>
      </VWindow>
    </VForm>
    <CardAddSupplier
      :is-dialog-visible="isSupplierDialogVisible"
      @supplier-data="fetchSuppliers"
      @update:is-dialog-visible="triggerDialog"
    />
  </VNavigationDrawer>
</template>

<style scoped>
.form_section {
  margin-block-start: 3em;
}

.scrollable-content {
  overflow-y: scroll !important;
}
</style>
