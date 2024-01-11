<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import {
  requiredValidator,
} from '@validators';
import { useCompanyStore } from '@/stores';

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  companyData: {
    type: Object,
    default: () => { },
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'companyData',
  'editCompany',
])

const store = useCompanyStore()
const message = inject('showToaster')

const isFormValid = ref(false)
const isEditing = ref(false)

const refForm = ref()
const isOpen = computed(() => props.isDrawerOpen)
const companyEditData = computed(() => props.companyData)

const drawerOpen = ref(false)

watch(isOpen, newVal => {
  drawerOpen.value = newVal
})

const loadings = ref([])

const formData = ref({
  name: '',
})

watch(companyEditData, newVal => {
  formData.value = { ...formData.value, ...newVal }
  isEditing.value = true
})

const subDomain = ref('')

const baseUrl = ref(localStorage.getItem('baseUrl'))

const roles = ref(["one", "tow"])

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    isEditing.value = false
    subDomain.value = ''
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const updateCompany = () => {

}

const onSubmit = async () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {

      } catch (err) {

      }
    }
  })
}
</script>

<template>
  <VNavigationDrawer temporary :width="500" location="end" class="scrollable-content" :model-value="drawerOpen"
    @update:model-value="handleDrawerModelValueUpdate">
    <div class="d-flex align-center pa-6 pb-1">
      <h6 v-if="!isEditing" class="text-h6">
        Add Role
      </h6>
      <h6 v-else class="text-h6">
        Edit Company
      </h6>

      <VSpacer />

      <div class="d-flex text-center">
        <VBtn variant="text" @click="closeNavigationDrawer">
          Cancel
        </VBtn>
        <VBtn v-if="!isEditing" :loading="loadings[0]" variant="tonal" type="submit" @click="onSubmit">
          Submit
        </VBtn>
        <VBtn v-else variant="tonal" @click="updateCompany">
          Update
        </VBtn>
      </div>
    </div>
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="() => { }">
            <VCol cols="12">
              <VTextField v-model="formData.name" :rules="[requiredValidator]" label="Enter Role" />
            </VCol>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
