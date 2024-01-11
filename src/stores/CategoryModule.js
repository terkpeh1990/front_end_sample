import { del, get, post, put, query } from "@/@core/services/ApiService";
import { createAxiosInstance } from '@/plugins/axios';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore('categories', () => {
  const errors = ref({})
  
  // Actions
  const fetchAllCategories = async (page = 1, search = '', page_size) => {
    errors.value = '';
    let params = { page, page_size }
    if (search !== '') {
      params = { ...params, search }
    }


    return query('/categories', { params })
      .then(async res => {
        return res.data 
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const fetchSingleCategory = async categoryId => {
    return get('/categories', categoryId)
      .then(async data => {        
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const createNewCategory = async payload => {
    return post('/categories/', payload)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const updateCategory = async (categoryId, payload) => {
    return put(`/categories/${categoryId}/`, payload)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const deleteCategory = async categoryId => {
    return del(`/categories/${categoryId}/`)
      .then(async data => {    
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  return { errors, fetchAllCategories, fetchSingleCategory, createNewCategory, updateCategory, deleteCategory }
});
