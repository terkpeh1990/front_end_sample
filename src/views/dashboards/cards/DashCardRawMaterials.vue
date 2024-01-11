<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const materials = {
  intake: '1.4k',
  outtake: '0.5k',
}

const vuetifyTheme = useTheme()

const series = [
  {
    name: 'PRODUCT A',
    data: [
      4,
      3,
      6,
      4,
      3,
    ],
  },
  {
    name: 'PRODUCT B',
    data: [
      -3,
      -4,
      -3,
      -2,
      -3,
    ],
  },
]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  
  return {
    chart: {
      type: 'bar',
      height: 90,
      parentHeightOffset: 0,
      stacked: true,
      toolbar: { show: false },
    },
    series: [
      {
        name: 'PRODUCT A',
        data: [
          4,
          3,
          6,
          4,
          3,
        ],
      },
      {
        name: 'PRODUCT B',
        data: [
          -3,
          -4,
          -3,
          -2,
          -3,
        ],
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        barHeight: '100%',
        borderRadius: 5,
        startingShape: 'rounded',
        endingShape: 'rounded',
      },
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 1,
      lineCap: 'round',
      colors: [currentTheme.surface],
    },
    legend: { show: false },
    colors: [
      currentTheme.primary,
      currentTheme.success,
    ],
    grid: {
      show: false,
      padding: {
        top: -41,
        right: -5,
        left: -3,
        bottom: -22,
      },
    },
    xaxis: {
      categories: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
      ],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    responsive: [
      {
        breakpoint: 1441,
        options: { plotOptions: { bar: { columnWidth: '40%' } } },
      },
      {
        breakpoint: 1300,
        options: { plotOptions: { bar: { columnWidth: '50%' } } },
      },
      {
        breakpoint: 1279,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '20%',
            },
          },
        },
      },
      {
        breakpoint: 1025,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 7,
              columnWidth: '25%',
            },
          },
          chart: { height: 110 },
        },
      },
      {
        breakpoint: 960,
        options: { plotOptions: { bar: { borderRadius: 6 } } },
      },
      {
        breakpoint: 782,
        options: { plotOptions: { bar: { columnWidth: '30%' } } },
      },
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 12,
              columnWidth: '25%',
            },
          },
          chart: { height: 160 },
        },
      },
      {
        breakpoint: 426,
        options: { plotOptions: { bar: { borderRadius: 8 } } },
      },
      {
        breakpoint: 376,
        options: { plotOptions: { bar: { borderRadius: 6 } } },
      },
    ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
  }
})
</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between">
      <div class="d-flex flex-column">
        <div class="mb-auto">
          <h6 class="text-h6 text-no-wrap">
            Raw Materials
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
