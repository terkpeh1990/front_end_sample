import { get } from "@/@core/services/ApiService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoleStore = defineStore('role', () => {
  const errors = ref({})
  
  // Actions
  const fetchRoles = async () => {
    errors.value = '';
    
    return get('/groups')
      .then(async res => {
        
        return res.data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const fetchPermissions = async () => {
    errors.value = '';
    
    return get('/permissions')
      .then(async res => {
        return res.data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  return { fetchRoles, fetchPermissions, errors }
});
