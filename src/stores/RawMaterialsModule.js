import { get, post, query } from '@/@core/services/ApiService';
import { createAxiosInstance } from "@/plugins/axios";
import { defineStore } from "pinia";

export const useRawMaterialsStore = defineStore('materials', () => {
 
  const url  = localStorage.getItem('baseUrl');

  const createRawMaterialsForm = async payload => {
    return createAxiosInstance(url).post('/material_form/', payload)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const fetchRawMaterialsForm = async () => {
    return createAxiosInstance(url).get('/material_form')
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  

  const createStockForm = async payload => {
    return createAxiosInstance(url).post('/restock_form/', payload)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const fetchStockForm = async () => {
    return createAxiosInstance(url).get('/restock_form')
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const updateForm = async ({ type, id, payload }) => {
    
    return createAxiosInstance(url).put(`/${type}/${id}/`, payload)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const deleteForm = async ({ type, id }) => {
    return createAxiosInstance(url).delete(`/${type}/${id}/`)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const fetchRawMaterials = async (page = 1, search = '', page_size) => {
    let params = { page, page_size }
    if (search !== '') {
      params = { ...params, search }
    }
    
    return query('/materials', { params })
      .then(async res => {
        
        return res.data;
      }).catch(err => {
        return err.response
      })
  }

  const fetchSingleRawMaterial = async id => {
    
    return get('/material', id)
      .then(async res => {
        
        return res.data;
      }).catch(err => {
        return err.response
      })
  }

  const createRawMaterial = async payload => {
    return post('/materials/', payload)
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }


  const validateBatchNumber = async batchNumber => {
    return post(`/inventory/verify/${batchNumber}/`)
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  return { createRawMaterialsForm, fetchRawMaterialsForm, fetchStockForm, createStockForm , updateForm, deleteForm, fetchRawMaterials, createRawMaterial, fetchSingleRawMaterial, validateBatchNumber }

})
