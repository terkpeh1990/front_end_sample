import { del, get, post, put, query } from "@/@core/services/ApiService";
import { createAxiosInstance } from '@/plugins/axios';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBrandStore = defineStore('brand', () => {
  const errors = ref({})
  
  // Actions
  const fetchAllbrands = async (page = 1, search = '', page_size) => {
    errors.value = '';
    let params = { page, page_size }
    if (search !== '') {
      params = { ...params, search }
    }
    
    return query('/brands', { params })
      .then(async res => {
        return res.data 
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const fetchSingleBrand = async brandId => {
    return get('/brands', brandId)
      .then(async data => {        
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const createNewBrand = async payload => {
    return post('/brands/', payload)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const updateBrand = async (brandId, payload) => {
    return put(`/brands/${brandId}/`, payload)
      .then(async data => {    
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const deleteBrand = async brandId => {
    return del(`/brands/${brandId}/`)
      .then(async data => {    
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  return { errors, fetchAllbrands, fetchSingleBrand, createNewBrand, updateBrand, deleteBrand }
});
