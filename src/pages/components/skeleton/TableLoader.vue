<script setup>
const props = defineProps({
  columnCount: { type: Number, default: () => 5 },
})

const columns = ref(props.columnCount)
</script>

<template>
  <!-- begin::Card -->
  <tbody>
    <template
      v-for="j in 10"
      :key="j"
    >
      <tr>
        <template
          v-for="i in columns + 1"
          :key="i"
        >
          <td
                
            class="loading"
          >
            <div class="bar" />
          </td>
        </template>
      </tr>
    </template>
  </tbody>
  <!-- end::Card -->
</template>

<style scoped>
@keyframes loading {
  40% {
    background-position: 100% 0;
  }

  100% {
    background-position: 100% 0;
  }
}

.table tbody td:last-child {
  border-radius: 0 8px 8px 0;
}

.loading {
  position: relative;
}

.loading .bar {
  /* border-radius: 7px; */
  background-color: rgb(var(--v-theme-background));
  block-size: 25px;

  /* inline-size: 80%; */
}

.loading::after {
  position: absolute;
  display: block;
  animation: loading 1.3s infinite;
  background-image:
    linear-gradient(
      100deg,
      rgba(var(--v-theme-grey-300), 0%),
      rgba(var(--v-theme-grey-300), 50%) 60%,
      rgba(var(--v-theme-grey-300), 0%) 80%
    );
  background-position: -100px 0;
  background-repeat: no-repeat;
  background-size: 200px 24px;
  block-size: 24px;
  content: "";
  inline-size: 100%;
  inset-block-start: 50%;
  inset-inline-start: 0;
  transform: translateY(-50%);
}
</style>
