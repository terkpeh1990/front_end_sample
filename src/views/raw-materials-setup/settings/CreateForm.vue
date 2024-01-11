<script setup>
import MaterialForm from "./forms/MaterialForm.vue";
import SelectFormType from "./forms/SelectFormType.vue";
import StockForm from "./forms/StockForm.vue";


const material = ref(false);
const stock = ref(false);

function createFormType(type) {
  type === "material" ? material.value = true : stock.value = true;
}


function goBack() {
  material.value = false;
  stock.value = false;
}
</script>

<template>
  <VCard
    height="600"
    class="overflow-y-auto"
  >
    <VCardText>
      <div
        class="formWrap d-flex flex items-center justify-space-between pt-2 bg-surface"
      >
        <div>
          <VCardTitle>Create Form</VCardTitle>
          <VCardSubtitle class="wrap">
            Create a form to collect Stocks or Raw Materials.
          </VCardSubtitle>
        </div>
        <VBtn
          prepend-icon="
      tabler-arrow-left"
          type="button"
          variant="tonal"
          @click="goBack"
        >
          Go Back
        </VBtn>
      </div>
      <template v-if="!material && !stock">
        <SelectFormType :create-form="createFormType" />
      </template>
      <template v-if="material">
        <MaterialForm />
      </template>
      <template v-if="stock">
        <StockForm />
      </template>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.formWrap {
  position: sticky;
  z-index: 100;
  /* stylelint-disable-next-line liberty/use-logical-spec */
  top: 0;
  background: #fff;
}
</style>
