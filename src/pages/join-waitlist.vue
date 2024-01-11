<script setup>
import logo from "@images/_logo_velma.png";
import WaitlistRightPanel from "@/views/join-waitlist/WaitlistRightPanel.vue"
import BasicDetails from "@/views/join-waitlist/BasicDetails.vue";
import CompanyDetails from "@/views/join-waitlist/CompanyDetails.vue";
import AddressDetails from "@/views/join-waitlist/AddressDetails.vue";
import ContactPerson from "@/views/join-waitlist/ContactPerson.vue";
import PreferedServices from "@/views/join-waitlist/PreferedServices.vue";

const refForm = ref();
const formData = ref({ address: {}, contact_person: { name: '' }, features: [] });
const page = ref(1);

const handleNext = () => {
  if (page.value === 5) return;
  page.value += 1
};

const handlePrev = () => {
  if (page.value === 1) return;
  page.value -= 1
};
</script>

<template>
  <div class="main__wrapper">
    <div class="logo-wrap d-flex flex items-center justify-space-between mb-8">
      <VImg :src="logo" alt="logo" :max-width="150" class="" />
      <div class="privacy">
        <small class="text-right">
          <RouterLink to="" class="app-logo d-flex align-center gap-x-1">
            <VIcon icon="tabler-lock" />
            Privacy Policy
          </RouterLink>
        </small>
      </div>
    </div>
    <VRow>
      <VCol col="12" md="8">
        <VCard class="left-v-card rounded-0">
          <VCardTitle class="text-primary text-h5 font-bold px-0">
            Join Velma Waitlist
          </VCardTitle>
          <VCardSubtitle class="px-0">
            Cloud · Powered · Production · Management · System.
          </VCardSubtitle>
          <VDivider class="mt-4 mb-4" />

          <VCardText class="pa-0">
            <p>
              An exciting opportunity to join the production management system, helping to manage services that power
              the moving parts of Production Processes.
            </p>

            <VCol class="pa-0 mt-8" col="12" md="8">
              <template v-if="page === 1">
                <BasicDetails :form-data="formData" />
              </template>
              <template v-if="page === 2">
                <CompanyDetails :form-data="formData" />
              </template>
              <template v-if="page === 3">
                <AddressDetails :form-data="formData" />
              </template>
              <template v-if="page === 4">
                <ContactPerson :form-data="formData" />
              </template>
              <template v-if="page === 5">
                <PreferedServices :form-data="formData" />
              </template>
            </VCol>
            <VCol class="pa-0" col="12" md="4">
              <div class="left-right-nav d-flex flex justify-between gap-4">
                <div>
                  <p>{{ `page ${page} of 5` }}</p>
                </div>
                <div class="d-flex flex gap-4">
                  <VChip color="primary" class="rounded-0" @click="handlePrev">
                    <VIcon icon="tabler-arrow-left" />
                  </VChip>
                  <VChip color="primary" class="rounded-0" @click="handleNext">
                    <VIcon icon="tabler-arrow-right" />
                  </VChip>
                </div>
              </div>
            </VCol>
          </VCardText>
        </VCard>
      </VCol>
      <VCol col="12" md="4">
        <WaitlistRightPanel />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.main__wrapper {
  padding: 40px 12px;
}

// .left-v-card {
//   min-height: 300px;
// }
.left-v-card {
  min-height: 680px;
  padding: 16px !important;
}

.privacy {
  margin-top: 17px;
}

.left-right-nav {
  position: absolute;
  right: 24px;
  left: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (min-width: 900px) {

  .left-v-card {
    min-height: 680px;
    padding: 16px 32px !important;
  }
}

@media screen and (min-width: 600px) {
  .main__wrapper {
    padding: 50px 80px 0;
  }

  .privacy {
    margin-top: 18px;
  }

  .left-v-card {
    min-height: 680px;
    padding: 16px 32px !important;
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
