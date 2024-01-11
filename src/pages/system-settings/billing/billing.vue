<script setup>
import BillingHistory from './billingHistory.vue';
import PaymentMethod from "./paymentMethod.vue"
import congoImg from '@images/illustrations/congo-illustration.png'
import illus from '@images/illustrations/upgrade.svg'

const isUpgradePlanDialogVisible = ref(false);
</script>

<template>
  <VRow cols="12">
    <VCol cols="12" md="6">
      <VCard title="Current Plan">
        <VCardText>
          <VCol cols="12" order="1">
            <!-- 👉 Alert -->
            <VAlert color="warning" variant="tonal">
              <VAlertTitle class="mb-1">
                We need your attention!
              </VAlertTitle>
              <span>Your plan requires update</span>
            </VAlert>

            <!-- 👉 Progress -->
            <div class="d-flex justify-space-between font-weight-bold mt-8 mb-2">
              <h6 class="text-sm">
                Days
              </h6>
              <h6 class="text-sm">
                26 of 30 Days
              </h6>
            </div>

            <VProgressLinear rounded color="primary" :height="10" :model-value="75" />
            <p class="text-sm mt-2">
              6 days remaining until your plan requires update
            </p>
          </VCol>
          <VCol cols="12">
            <h6 class="text-base font-weight-semibold mb-1">
              Active until Dec 09, 2021
            </h6>
            <p class="text-sm">
              We will send you a notification upon Subscription expiration
            </p>

            <h6 class="text-base font-weight-semibold mb-1">
              <span class="me-3">$199 Per Month</span>
              <VChip color="primary" size="small" label>
                popular
              </VChip>
            </h6>
            <p class="text-sm mb-0">
              Standard plan for small to medium businesses
            </p>
          </VCol>
          <VCol cols="12" order="3">
            <div class="d-flex flex-wrap gap-4">
              <VBtn @click="isUpgradePlanDialogVisible = true">
                upgrade plan
              </VBtn>

              <VBtn color="error" variant="tonal">
                Cancel Subscription
              </VBtn>
            </div>
          </VCol>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="6">
      <VCard class="h-full" height="100%">
        <VCardText class="mb-12">
          <p class="text-h6 text-center">
            Checkout additional features that <br> enhances your operations
          </p>
          <div class="flex d-flex items-center justify-center mt-16">
            <VBtn color="" variant="tonal">
              Additional Features
            </VBtn>
          </div>
        </VCardText>
        <div class="misc-avatar w-100">
          <VImg :src="illus" alt="Coming Soon" :max-width="263" class="mx-auto" />
        </div>
      </VCard>
    </VCol>
  </VRow>

  <VRow>
    <PaymentMethod />
    <VCol cols="12" md="6">
      <BillingHistory />
    </VCol>
  </VRow>
</template>
