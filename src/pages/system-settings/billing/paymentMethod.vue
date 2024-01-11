<script setup>
import mastercard from '@images/icons/payments/mastercard.png'
import visa from '@images/icons/payments/visa.png'


const currentCardDetails = ref()
const isCardEditDialogVisible = ref(false)

const cardNumber = ref(135632156548789)
const cardName = ref('john Doe')
const cardExpiryDate = ref('05/24')
const cardCvv = ref(420)

const creditCards = [
  {
    name: 'Tom McBride',
    number: '4851234567899865',
    expiry: '12/24',
    isPrimary: true,
    type: 'mastercard',
    cvv: '123',
    image: mastercard,
  },
  {
    name: 'Mildred Wagner',
    number: '5531234567895678',
    expiry: '02/24',
    isPrimary: false,
    type: 'visa',
    cvv: '456',
    image: visa,
  },
]
</script>

<template>
  <VCol
    cols="12"
    md="6"
  >
    <VCard title="Payment Methods">
      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VCol
            cols="12"
          >
            <VCardTitle class="pa-0">
              <p class="pa-0 text-lg">
                Add a new card
              </p>
            </VCardTitle>
            <VRow>
              <!-- 👉 card type switch -->
              <VCol cols="12">
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="cardNumber"
                      label="Card Number"
                      type="number"
                    />
                  </VCol>

                  <!-- 👉 Name -->
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="cardName"
                      label="Name"
                    />
                  </VCol>

                  <!-- 👉 Expiry date -->
                  <VCol
                    cols="6"
                    md="3"
                  >
                    <VTextField
                      v-model="cardExpiryDate"
                      label="Expiry Date"
                    />
                  </VCol>

                  <!-- 👉 Cvv code -->
                  <VCol
                    cols="6"
                    md="3"
                  >
                    <VTextField
                      v-model="cardCvv"
                      type="password"
                      label="CVV Code"
                    />
                  </VCol>
                </VRow>
              </VCol>

              <VCol cols="12">
                <VRow v-show="selectedPaymentMethod === 'credit-debit-atm-card'">
                  <!-- 👉 Card Number -->
                  <VCol cols="12">
                    <VTextField
                      v-model="cardNumber"
                      label="Card Number"
                      type="number"
                    />
                  </VCol>

                  <!-- 👉 Name -->
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="cardName"
                      label="Name"
                    />
                  </VCol>

                  <!-- 👉 Expiry date -->
                  <VCol
                    cols="6"
                    md="3"
                  >
                    <VTextField
                      v-model="cardExpiryDate"
                      label="Expiry Date"
                    />
                  </VCol>

                  <!-- 👉 Cvv code -->
                  <VCol
                    cols="6"
                    md="3"
                  >
                    <VTextField
                      v-model="cardCvv"
                      type="password"
                      label="CVV Code"
                    />
                  </VCol>

                  <!-- 👉 Future Billing switch -->
                  <VCol cols="12">
                    <VSwitch
                      v-model="isCardDetailSaveBilling"
                      density="compact"
                      label="Save card for future billing?"
                    />
                  </VCol>
                </VRow>

                <p
                  v-show="selectedPaymentMethod === 'cod-cheque'"
                  class="text-base"
                >
                  Cash on delivery is a mode of payment where you make the payment after the goods/services are received.
                </p>
                <p
                  v-show="selectedPaymentMethod === 'cod-cheque'"
                  class="text-base"
                >
                  You can pay cash or make the payment via debit/credit card directly to the delivery person.
                </p>
              </VCol>
            </VRow>
          </VCol>

          <!-- 👉 Payment method action button -->
          <VCol
            cols="12"
            class=""
          >
            <VBtn
              block
              type="submit"
              color=""
              variant="tonal"
            >
              Save changes
            </VBtn>
          </VCol>

          <!-- 👉 Saved Cards -->
          <VCol
            cols="12"
          >
            <h6 class="text-base font-weight-medium mb-3">
              My Cards
            </h6>

            <div class="d-flex flex-column gap-y-4">
              <VCard
                v-for="card in creditCards"
                :key="card.name"
                flat
                variant="tonal"
              >
                <VCardText class="d-flex flex-sm-row flex-column pa-4">
                  <div class="text-no-wrap">
                    <VImg
                      :src="card.image"
                      width="46"
                    />
                    <h4 class="my-3">
                      {{ card.name }}
                      <VChip
                        v-if="card.isPrimary"
                        label
                        color="primary"
                        size="small"
                      >
                        Primary
                      </VChip>
                    </h4>
                    <span class="text-base">**** **** **** {{ card.number.substring(card.number.length - 4) }}</span>
                  </div>

                  <VSpacer />

                  <div class="d-flex flex-column text-sm-end">
                    <div class="d-flex flex-wrap gap-4 order-sm-0 order-1">
                      <VBtn
                        variant="tonal"
                        @click="openEditCardDialog(card)"
                      >
                        Edit
                      </VBtn>
                      <VBtn
                        color="secondary"
                        variant="tonal"
                      >
                        Delete
                      </VBtn>
                    </div>
                    <span class="text-sm mt-sm-auto mb-sm-0 my-5 order-sm-1 order-0">Card expires at {{ card.expiry }}</span>
                  </div>
                </VCardText>
              </VCard>
            </div>

            <!-- 👉 Add Edit Card Dialog -->
            <CardAddEditDialog
              v-model:isDialogVisible="isCardEditDialogVisible"
              :card-details="currentCardDetails"
              class="v-dialog-lg"
            />
          </VCol>
        </VForm>
      </VCardText>
    </VCard>
  </VCol>
</template>
