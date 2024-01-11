import { get, post, setHeader } from "@/@core/services/ApiService";
import { getToken, getUser, saveToken } from "@/@core/services/JwtService";
import { createAxiosIns } from "@/plugins/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!getToken())
  const errors = ref({})
  
  const currentUser = computed(() => getUser())

  // Actions
  const login = async credentials => {
    errors.value = '';

    return post('/user/login/', credentials)
      .then(async res => {
        saveToken(res.data.access, res.data.refresh);
        setHeader();
        
        return res
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const verifyUserLogin = async email => {
    
    return get('/user/check_user_company', email)
      .then(async res => {
        
        return res;
      }).catch(err => {
        errors.value = err.response.data.message;
        
        return err;
      });
  }

  const refreshToken = async payload => {
    return createAxiosIns().post('/user/token/refresh/', payload)
      .then(async res => {    
        saveToken(res.data.access, res.data.refresh);
        setHeader();
      }).catch(err => {
        errors.value = err.message;
      });
  }

  return { isAuthenticated, errors, currentUser, login, verifyUserLogin, refreshToken }
});
