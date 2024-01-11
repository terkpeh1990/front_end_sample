<script setup>
import { refreshToken } from '@/router/utils';
import { useThemeConfig } from '@core/composable/useThemeConfig';
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';


const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
} = useThemeConfig()

const { global } = useTheme()

syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme();

const message = ref('')

const show = ref(false)

watch(show, val => {
  setTimeout(() => {
    if (!val) message.value = '';
  }, 50)
})

const color = ref()

function showMessage(msg) {
  message.value = msg;
  if (msg) show.value = true;
}
function showSuccess(msg, col) {
  message.value = msg;
  color.value = col;
  if (msg) show.value = true;
}

provide('showToast', showMessage)
provide('showToaster', showSuccess)
syncConfigThemeWithVuetifyTheme()

const intervalID = ref(null);

onMounted(() => {
  intervalID.value = setInterval(refreshToken, 30000)
})
onUnmounted(() => {
  clearInterval(intervalID.value)
})
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <VSnackbar
        v-model="show"
        :color="color"
        :timeout="3000"
      >
        <div class="d-flex flex items-center justify-space-between py-0">
          <p class="text-capitalize">
            {{ message }}
          </p>
     
          <VBtn
            icon="tabler-x"
            color="indigo"
            variant="text"
            @click="show = false"
          />
        </div>
      </VSnackbar>
      <RouterView />
    </VApp>
  </VLocaleProvider>
</template>
