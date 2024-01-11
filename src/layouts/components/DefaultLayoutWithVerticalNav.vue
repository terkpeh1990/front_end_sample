<script setup>
import { getUser } from '@/@core/services/JwtService';
import navItems from '@/navigation/product';
import { useThemeConfig } from '@core/composable/useThemeConfig';

// Components
// import Footer from '@/layouts/components/Footer.vue';
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';
import NavSearchBar from '@/layouts/components/NavSearchBar.vue';
import UserProfile from '@/layouts/components/UserProfile.vue';

// @layouts plugin
import { VerticalNavLayout } from '@layouts';

const authUser = ref(getUser())


const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()
</script>

<template>
  <VerticalNavLayout :nav-items="navItems" class="no-shadow">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <VBtn v-if="isLessThanOverlayNavBreakpoint(windowWidth)" icon variant="text" color="default" class="ms-n3"
          size="small" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="tabler-menu-2" size="24" />
        </VBtn>
        <NavSearchBar class="ms-lg-n3 w-100" />

        <VSpacer />
        <NavbarThemeSwitcher />
        <NavBarNotifications class="me-2" />
        <UserProfile :user-details="authUser" />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition :name="appRouteTransition" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style>
.layout-nav-type-vertical .layout-vertical-nav .nav-link> :first-child {
  border-radius: 0 !important;
}

@media screen and (min-width: 1280px) {
  .layout-nav-type-vertical .layout-vertical-nav {
    background-color: transparent;
  }
}

.nav-header {
  margin-block-end: 1.2em;
  margin-block-start: 1.2em;
}

.shadow-none {
  box-shadow: none !important;
}
</style>
