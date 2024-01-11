import { del, get, post, put, query } from "@/@core/services/ApiService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSupplierStore = defineStore('supplier', () => {
  const errors = ref({})
  
  // Actions
  const fetchAllSuppliers = async (page = 1, search = '', page_size) => {
    errors.value = '';
    let params = { page, page_size }
    if (search !== '') {
      params = { ...params, search }
    }
    
    return query('/suppliers', { params })
      .then(async res => {
        return res.data 
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const fetchSingleSupplier = async supplierId => {
    return get('/suppliers', supplierId)
      .then(async data => {        
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const createNewSupplier = async payload => {
    return post('/suppliers/', payload)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const updateSupplier = async (supplierId, payload) => {
    return put(`/suppliers/${supplierId}/`, payload)
      .then(async data => {    
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const deleteSupplier = async supplierId => {
    return del(`/suppliers/${supplierId}/`)
      .then(async data => {    
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  return { errors, fetchAllSuppliers, fetchSingleSupplier, createNewSupplier, updateSupplier, deleteSupplier }
});
