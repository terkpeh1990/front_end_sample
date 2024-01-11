<script setup>
import { useAppAbility } from "@/plugins/casl/useAppAbility";
import { useAuthStore } from "@/stores";

import authV1BottomShape from "@images/svg/auth-v1-bottom-shape.svg";
import authV1TopShape from "@images/svg/auth-v1-top-shape.svg";
import logo from "@images/velma-logos-white-transparent.png";

import { emailValidator, requiredValidator } from "@validators";
import { useRoute, useRouter } from "vue-router";

localStorage.setItem("baseUrl", "velma.cloud");

const route = useRoute();
const router = useRouter();
const message = inject("showToaster");

const ability = useAppAbility();

const isFormValid = ref(false);

const refForm = ref();
const store = useAuthStore();
const loading = ref(false);
const isPasswordVisible = ref(false);
const email = ref("");
const password = ref("");

const setBaseUrl = url => {
  localStorage.setItem("baseUrl", url);
};

const loginUser = async () => {
  try {
    const response = await store.login({ email: email.value, password: password.value });

    const userAbilities = [{ action: "manage", subject: "all" }];

    if (response.status === 200) {
      localStorage.setItem("userAbilities", JSON.stringify(userAbilities));

      ability.update(userAbilities);
      message("Login successful", "success");
      router.replace(route.query.to ? String(route.query.to) : "/");
    }
    if (response.status === 401) {
      message(response.data.detail, "error");
    }
  } catch (err) {
    message(store.errors, "error");
  }
};

const authenticate = async () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      loading.value = true;
      try {
        const response = await store.verifyUserLogin(email.value);
        if (response && response.status === 200) {
          setBaseUrl(response.data.data.sub_domains);
          await loginUser();
        } else {
          message(response.data.message, "error");
        }
      } catch (error) {
        message(store.errors, "error");
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper main-wrapper position-relative"
  >
    <VCol
      cols="12"
      lg="6"
      class="left-col d-flex align-center"
    >
      <div class="left-panel-item mx-auto">
        <div class="logo-wrap d-flex flex items-center mb-6">
          <VImg
            :src="logo"
            alt="logo"
            :max-width="200"
            class=""
          />
        </div>
        <h4 class="text-h6 text-title text-white font-weight-semibold ma-2">
          A cloud powered production management system.
        </h4>
      </div>
    </VCol>
    <VCol
      cols="12"
      lg="6"
      class="right-col d-flex align-center justify-center"
    >
      <VImg
        :src="authV1TopShape"
        class="auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VImg
        :src="authV1BottomShape"
        class="auth-v1-bottom-shape d-none d-sm-block"
      />
      <VCard
        class="auth-card pa-16 rounded-lg d-grid align-center justify-center"
        max-width="600"
        height="720"
      >
        <VCardText
          class="form-inner-wrapper"
          width="100%"
        >
          <VCardText class="mb-4">
            <h5 class="text-h5 text-center font-weight-semibold mb-1">
              Welcome
            </h5>
            <p class="mb-1 text-center">
              Please sign-in to your account
            </p>
          </VCardText>

          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="() => {}"
          >
            <VTextField
              v-model="email"
              label="Enter Email"
              type="email"
              class="custom_input"
              :rules="[requiredValidator, emailValidator]"
            />
            <VTextField
              v-model="password"
              label="Enter Password"
              :rules="[requiredValidator]"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />

            <VBtn
              block
              type="submit"
              class="mt-2"
              :loading="loading"
              @click="authenticate"
            >
              Login
            </VBtn>
          </VForm>
          <div class="d-flex align-center flex-wrap justify-center mt-8 mb-4">
            <small class="text-right">
              Forgot Password?
              <a
                class="text-primary ms-2 mb-1"
                href="#"
              > Reset </a>
            </small>
          </div>
        </VCardText>
        <div class="d-flex align-center flex-wrap justify-center gap-4 mt-2 mb-4 pa-8">
          <small class="text-right">
            <RouterLink
              to=""
              class="app-logo d-flex align-center gap-x-3"
            >
              Signup
            </RouterLink>
          </small>
          <small class="text-right">
            <RouterLink
              to=""
              class="app-logo d-flex align-center gap-x-3"
            >
              Privacy Policy
            </RouterLink>
          </small>
          <small class="text-right">
            <RouterLink
              to=""
              class="app-logo d-flex align-center gap-x-3"
            >
              Contact Us
            </RouterLink>
          </small>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core/scss/template/pages/page-auth.scss";

.v-btn.v-btn--density-default {
  block-size: calc(var(--v-btn-height) + 10px) !important;
  margin-block-start: 2.5em !important;
}

.v-text-field .v-field--single-line input {
  padding-block: 0.8em !important;
  padding-inline: 1em !important;
}

.form-inner-wrapper {
  width: 100% !important;
  padding: 30px;
}

.main-wrapper {
  background-image: url("@images/pages/bg-main.jpeg");
  background-position: 50%;
  background-size: cover;
  height: 100vh;
  overflow-x: hidden;
}
.auth-card {
  width: 84%;
  display: flex;
  flex-direction: column;
}
.custom_input {
  margin-bottom: 32px;
}
@media screen and (max-width: 1279px) {
  .main-wrapper {
    padding: 20px 0;
  }

  .text-title {
    text-align: center;
  }
  .left-panel-item {
    width: 600px;
    padding: 0 24px;
    margin-bottom: 16px;
  }
  .form-inner {
    margin-top: 0 !important;
    padding: 0 !important;
  }
  .logo-wrap {
    margin-bottom: 0 !important;
    justify-content: center;
  }
}
@media screen and (max-width: 768px) {
  .main-wrapper {
    padding: 20px 0;
  }
  .left-panel-item {
    width: 600px;
    padding: 0 24px;
    margin-bottom: 0px;
  }

  .auth-card {
    width: 90%;
    padding: 0 !important;
    height: max-content !important;
  }
  .right-col {
    align-items: start !important;
  }
  .logo-wrap {
    margin-bottom: 0 !important;
    justify-content: center;
  }
  .text-title {
    font-size: 17px !important;
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
