<script setup>
import { useThemeConfig } from '@core/composable/useThemeConfig';
import { themeConfig } from '@themeConfig';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { useTheme } from 'vuetify';

const { theme, appContentLayoutNav, isLessThanOverlayNavBreakpoint } = useThemeConfig()

// 👉 Primary Color
const vuetifyTheme = useTheme()

// const vuetifyThemesName = Object.keys(vuetifyTheme.themes.value)
const initialThemeColors = JSON.parse(JSON.stringify(vuetifyTheme.current.value.colors))

const colors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
]

const setPrimaryColor = color => {
  const currentThemeName = vuetifyTheme.name.value

  vuetifyTheme.themes.value[currentThemeName].colors.primary = color
  localStorage.setItem(`${ themeConfig.app.title }-${ currentThemeName }ThemePrimaryColor`, color)
  localStorage.setItem(`${ themeConfig.app.title }-initial-loader-color`, color)
}

const getBoxColor = (color, index) => index ? color : '#7367F0'
const { width: windowWidth } = useWindowSize()
</script>

<template>
  <VCard>
    <VCardText>
      <template v-if="!isLessThanOverlayNavBreakpoint(windowWidth)">
        <div class="customizer-heading d-flex align-center justify-space-between">
          <div>
            <span class="text-body-1">Customize your view</span>
          </div>
        </div>

        <VDivider />

        <PerfectScrollbar
          tag="ul"
          :options="{ wheelPropagation: false }"
        >
          <!-- SECTION Theming -->
          <CustomizerSection
            title=""
            :divider="false"
          >
            <!-- 👉 Theme -->
            <h6 class="mt-3 text-base font-weight-regular mt-12">
              Theme
            </h6>
            <div class="d-flex align-center">
              <VLabel
                for="pricing-plan-toggle"
                class="me-3"
              >
                Light
              </VLabel>

              <div>
                <VSwitch
                  id="pricing-plan-toggle"
                  v-model="theme"
                  label="Dark"
                  true-value="dark"
                  false-value="light"
                />
              </div>
            </div>

            <!-- 👉 Primary color -->
            <h6 class="mt-3 text-base font-weight-regular mt-5">
              Primary Color
            </h6>
            <div class="d-flex gap-x-4 mt-2">
              <div
                v-for="(color, index) in colors"
                :key="color"
                style="width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; transition: all 0.25s ease;"
                :style="{ backgroundColor: getBoxColor(initialThemeColors[color], index) }"
                class="cursor-pointer d-flex align-center justify-center"
                :class="{ 'elevation-4': vuetifyTheme.current.value.colors.primary === getBoxColor(initialThemeColors[color], index) }"
                @click="setPrimaryColor(getBoxColor(initialThemeColors[color], index))"
              >
                <VFadeTransition>
                  <VIcon
                    v-show="vuetifyTheme.current.value.colors.primary === (getBoxColor(initialThemeColors[color], index))"
                    icon="tabler-check"
                    color="white"
                  />
                </VFadeTransition>
              </div>
            </div>
          </CustomizerSection>
          <!-- !SECTION -->
        </PerfectScrollbar>
      </template>
    </VCardText>
  </VCard>
</template>

<route lang="yaml">
meta:
  navActiveLink: system-settings-tab
</route>
