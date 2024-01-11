<script setup>
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useInventoryStore } from '@/stores'

const props = defineProps({
  data: { type: Object, required: true },
})

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const route = useRoute()

const { fetchInventoryGraph } = useInventoryStore()
const loading = ref(false)
const graphData = ref()

const fetchData = async () => {
  loading.value = true

  const res = await fetchInventoryGraph(route.params.id)

  graphData.value = res.data.data
  loading.value = false
}

watchEffect(() => fetchData())

const vuetifyTheme = useTheme()

const series = ref([{
  data: [

  ],
}])

const categories = ref([])

watch(graphData, newVal =>{
  if (newVal.length > 0){
    graphData.value.forEach(element => {
      series.value[0].data.push(element.total_number_of_intake)
      categories.value.push(month[new Date(element.month).getMonth()])
    });
  }
})

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const labelSuccessColor = `rgba(${ hexToRgb(currentTheme.success) },0.16)`
  const labelColor = `rgba(${ hexToRgb(currentTheme['on-surface']) },${ variableTheme['disabled-opacity'] })`
  
  return {
    chart: {
      type: 'bar',
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        barHeight: '80%',
        columnWidth: '30%',
        startingShape: 'rounded',
        endingShape: 'rounded',
        borderRadius: 6,
        distributed: true,
      },
    },
    tooltip: { enabled: false },
    grid: {
      show: false,
      padding: {
        top: -20,
        bottom: -12,
        left: -10,
        right: 0,
      },
    },
    colors: [
      labelSuccessColor,
      labelSuccessColor,
      labelSuccessColor,
      labelSuccessColor,
      currentTheme.success,
      labelSuccessColor,
      labelSuccessColor,
    ],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: categories.value,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '14px',
          fontFamily: 'Public sans',
        },
      },
    },
    yaxis: { labels: { show: false } },
    states: { hover: { filter: { type: 'none' } } },
    responsive: [
      {
        breakpoint: 1471,
        options: { plotOptions: { bar: { columnWidth: '50%' } } },
      },
      {
        breakpoint: 1350,
        options: { plotOptions: { bar: { columnWidth: '57%' } } },
      },
      {
        breakpoint: 1032,
        options: { plotOptions: { bar: { columnWidth: '60%' } } },
      },
      {
        breakpoint: 992,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '40%',
              borderRadius: 8,
            },
          },
        },
      },
      {
        breakpoint: 855,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
              borderRadius: 6,
            },
          },
        },
      },
      {
        breakpoint: 440,
        options: { plotOptions: { bar: { columnWidth: '40%' } } },
      },
      {
        breakpoint: 381,
        options: { plotOptions: { bar: { columnWidth: '45%' } } },
      },
    ],
  }
})
</script>

<template>
  <VCardText class="d-flex flex-column justify-space-between">
    <div class="d-flex">
      <div class="mb-auto">
        <span class="text-sm">Intake Report</span>
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
</template>
