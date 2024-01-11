import { get, put, update } from "@/@core/services/ApiService";
import { createAxiosInstance } from "@/plugins/axios";
import { defineStore } from "pinia";
import {  ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const errors = ref({})
  const fetchingUsers = ref(false)
  
  // Actions

  const getSingleUser = async () => {
    return get('/user')
      .then(async res => {
        return res;
      }).catch(err => {
        errors.value = err.message;

        return err;
      });
  }

  const updatetUserPassword = async payload => {
    return put('/user/change-password/', payload)
      .then(async res => {
        return res;
      }).catch(err => {
        errors.value = err.message;

        return err.response;
      });
  }
 
  const getUsersList = async () => {
    errors.value = '';
    fetchingUsers.value = true
    
    return get('/user/list')
      .then(async res => {
        
        return res.data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      }).finally ( () => {
        fetchingUsers.value = false
      })
  }

  const getSingleUserDetails = async userId => {
    errors.value = '';
    
    return get(`/user/user-info/${userId}`)
      .then(async res => {
        return res.data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const url  = localStorage.getItem('baseUrl');

  const updateSingleUserDetails = async ({ userId, payload }) => {
    return createAxiosInstance(url).patch(`/user/user-info/${userId}/`, payload)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }


  return { errors, fetchingUsers, getSingleUser, updatetUserPassword, getUsersList, getSingleUserDetails, updateSingleUserDetails  }
});
