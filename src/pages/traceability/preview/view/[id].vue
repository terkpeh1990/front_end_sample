<script setup>
import tomato from '@images/eCommerce/tomato.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar3 from '@images/avatars/avatar-3.png'
import pumaShoes from '@images/pages/puma-shoes.jpeg'
import headphone from '@images/eCommerce/headphone.png'

const serverSwitch = ref(false);

const dotColors = ["error", "success", "info", "primary"]

const timelines = [
  {
    id: '1D904',
    name: 'Cheese puffs',
    productUrl: tomato,
    status: 'Paid',
    inStock: '300',
    totalProduced: '400',
    prodDate: '2023-02-02',
    expDate: '2025-02-02',
    avatar: ['', ''],
    rawMaterials: ['vinegar', 'salt', 'sugar', 'dairy'],
    client: {
      name: 'Adam Smith',
      companyEmail: 'adams@gmail.com',
      imageUrl: avatar1,
    },
  },
  {
    id: '1DL40',
    name: 'Cheese puffs',
    productUrl: pumaShoes,
    status: 'Paid',
    inStock: '300',
    totalProduced: '400',
    prodDate: '2023-02-02',
    expDate: '2025-02-02',
    avatar: ['', ''],
    rawMaterials: ['vinegar', 'salt', 'sugar', 'dairy'],
    client: {
      name: 'Eve Smith',
      companyEmail: 'adams@gmail.com',
      imageUrl: avatar2,
    },
  },
  {
    id: '1DL42',
    name: 'Cheese puffs',
    productUrl: headphone,
    status: 'Paid',
    inStock: '300',
    totalProduced: '400',
    prodDate: '2023-02-02',
    expDate: '2025-02-02',
    avatar: ['', ''],
    rawMaterials: ['vinegar', 'salt', 'sugar', 'dairy'],
    client: {
      name: 'Eve Smith',
      companyEmail: 'adams@gmail.com',
      imageUrl: avatar3,
    },
  },
];
</script>

<template>
  <VCol
    cols="12"
    md="8"
  >
    <VCard title="Basic Timeline">
      <VCardText>
        <VTimeline
          v-for="(timeline, index) in timelines"
          :key="timeline.id"
          side="end"
          align="start"
          density="compact"
          class="v-timeline-density-compact"
        >
          <!-- SECTION Timeline Item: Puma Shoes -->
          <VTimelineItem
            class="mb-5"
            size="x-small"
            :dot-color="dotColors[index]"
          >
            <!-- 👉 Person -->
            <div class="d-flex justify-space-between align-center">
              <!-- 👉 Avatar & Personal Info -->
              <span class="d-flex align-bottom mt-2">
                <VAvatar
                  size="40"
                  class="me-2"
                  :image="timeline.client.imageUrl"
                />
                <div>
                  <h6 class="text-sm font-weight-semibold">{{ timeline.client.name }}</h6>
                  <span>Javascript Developer</span>
                </div>
              </span>

              <!-- 👉 Person Actions -->
              <div class="text-sm-center">
                <h6 class="text-base font-weight-semibold">
                  Quantity
                </h6>
                <span>{{ timeline.totalProduced }}</span>
              </div>
            </div>
            <VDivider
              class="my-4"
            />
            <div class="d-flex align-start flex-sm-row flex-column mb-3">
              <VImg
                height="62"
                width="62"
                :src="timeline.productUrl"
                class="rounded me-4"
              />

              <div>
                <!-- Header -->
                <div class="d-flex justify-space-between">
                  <h6 class="font-weight-semibold text-base mb-1 me-3">
                    Sold Puma POPX Blue Color
                  </h6>
                  <small class="text-base text-no-wrap">January, 10</small>
                </div>
                <span>PUMA presents the latest shoes from its collection. Light &amp; comfortable made with highly durable material.</span>
              </div>
            </div>
          </VTimelineItem>
        <!-- !SECTION -->
        </VTimeline>
      </VCardText>
    </VCard>
  </VCol>
</template>

<style lang="scss" scoped>
.v-timeline-avatar-wrapper {
  background-color: rgb(var(--v-theme-background));
}
</style>
