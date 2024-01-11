<script setup>
import avatar1 from '@images/_logo_velma.png'
import { formatDate } from '@/@core/utils/formatters';
import ListItem from './ListItem.vue';
import CompanyLogo from './CompanyLogo.vue';
import {
  emailValidator,
  requiredValidator,
} from '@validators';

const props = defineProps({
  companyData: {
    type: Object,
    default: () => { },
  },
})

const avatarImg = ref(avatar1)
const isFormValid = ref(false)
const currentTab = ref(0)

// const refForm = ref()
const accountDataLocal = ref({})

const companyData = computed(() => {
  return props.companyData
})
</script>

<template>
  <VRow class="my-2">
    <VCol cols="5" sm="4">
      <VTabs v-model="currentTab" direction="vertical">
        <VTab class="text-h6 text-capitalize">
          Production Unit
        </VTab>

        <VTab class="text-lg text-capitalize">
          Sale Invoice
        </VTab>
      </VTabs>
    </VCol>

    <VDivider vertical />

    <VCol cols="7" sm="8">
      <VWindow v-model="currentTab" class="ms-3">
        <VWindowItem>
          <VCardText class="pt-2">
            <CompanyLogo />
            <!-- 👉 Form -->
            <VForm ref="refForm" v-model="isFormValid" class="mt-6" @submit.prevent="() => { }">
              <VRow>
                <!-- 👉 First Name -->
                <VCol cols="12">
                  <VTextField v-model="accountDataLocal.name" label="Company name" />
                </VCol>
                <VCol cols="12">
                  <VTextField v-model="accountDataLocal.email" label="E-mail" type="email" />
                </VCol>

                <!-- 👉 Phone -->
                <VCol cols="12">
                  <VTextField v-model="accountDataLocal.phone_number" label="Phone Number" />
                </VCol>
                <!-- 👉 State -->
                <VCol cols="12" md="6">
                  <VTextField v-model="accountDataLocal.address" label="Address" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="accountDataLocal.country" label="country" :rules="[requiredValidator]" />
                </VCol>

                <!-- 👉 City -->
                <VCol cols="12" md="6">
                  <VTextField v-model="accountDataLocal.city" label="city" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="accountDataLocal.website" label="Website" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12">
                  <VTextField v-model="accountDataLocal.footnote" label="Footnote" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">
                    Save changes
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VWindowItem>

        <VWindowItem>
          <VCardText class="pt-2">
            <CompanyLogo />
            <!-- 👉 Form -->
            <VForm ref="refForm" v-model="isFormValid" class="mt-6" @submit.prevent="() => { }">
              <VRow>
                <!-- 👉 First Name -->
                <VCol cols="12">
                  <VTextField v-model="accountDataLocal.name" label="Company name" />
                </VCol>
                <VCol cols="12">
                  <VTextField v-model="accountDataLocal.email" label="E-mail" type="email" />
                </VCol>

                <!-- 👉 Phone -->
                <VCol cols="12">
                  <VTextField v-model="accountDataLocal.phone_number" label="Phone Number" />
                </VCol>
                <!-- 👉 State -->
                <VCol cols="12" md="6">
                  <VTextField v-model="accountDataLocal.address" label="Address" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="accountDataLocal.country" label="country" :rules="[requiredValidator]" />
                </VCol>

                <!-- 👉 City -->
                <VCol cols="12" md="6">
                  <VTextField v-model="accountDataLocal.city" label="city" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="accountDataLocal.website" label="Website" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12">
                  <VTextField v-model="accountDataLocal.footnote" label="Footnote" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">
                    Save changes
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VWindowItem>

        <VWindowItem>
          <p>
            Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet
            ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget,
            vestibulum et, tempor auctor, justo.
          </p>

          <p class="mb-0">
            Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis,
            euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus
            interdum sagittis.
          </p>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
