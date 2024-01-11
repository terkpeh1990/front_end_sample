<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const materials = {
  intake: '1.4k',
  outtake: '0.5k',
}

const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors

const series = [{
  name: 'Subscribers',
  data: [
    200,
    55,
    400,
    250,
  ],
}]

const chartOptions = {
  chart: {
    type: 'area',
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  markers: {
    colors: 'transparent',
    strokeColors: 'transparent',
  },
  grid: { show: false },
  colors: [currentTheme.success],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.5,
      opacityTo: 0.07,
      stops: [
        0,
        80,
        100,
      ],
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  xaxis: {
    show: true,
    lines: { show: false },
    labels: { show: false },
    stroke: { width: 0 },
    axisBorder: { show: false },
  },
  yaxis: {
    stroke: { width: 0 },
    show: false,
  },
  tooltip: { enabled: false },
}
</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between">
      <div class="d-flex flex-column">
        <div class="mb-auto">
          <h6 class="text-h6 text-no-wrap">
            Production Unit
          </h6>
          <span class="text-sm">Weekly Report</span>
        </div>

        <div>
          <h5 class="text-h5 mb-1">
            {{ materials.intake }}
          </h5>
          <VChip
            label
            color="success"
          >
            {{ materials.outtake }}
          </VChip>
        </div>
      </div>
      <div>
        <VueApexCharts
          :options="chartOptions"
          :series="series"
          :height="165"
        />
      </div>
    </VCardText>
  </VCard>
</template>
