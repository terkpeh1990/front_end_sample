import { canNavigate } from "@layouts/plugins/casl";
import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { isUserLoggedIn, isTokenValid } from "./utils";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: to => {
        return { name: "dashboard" };
      },
    },
    ...setupLayouts(routes),
  ],
});

const publicRoutes = ["join-waitlist"]

const clearLocalStorage = () => {
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('token')
  localStorage.removeItem('baseUrl')
}

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn();
  const isValid = isTokenValid();

  const isAuthenticated = canNavigate(to) && isLoggedIn && isValid;

  if (to.name !== 'login' && !isAuthenticated && !publicRoutes.includes(to.name)) {
    clearLocalStorage()
    next({ name: 'login' })
  }
  else next()
});

export default router;
