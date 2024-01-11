import { del, get, post, put, query, update } from "@/@core/services/ApiService";
import { createAxiosInstance } from "@/plugins/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRestockStore = defineStore('restock', () => {
  const errors = ref({})
  
  // Actions
  const fetchAllStock = async (page = 1, search = '') => {
    errors.value = '';
    let params = { page }
    if (search !== '') {
      params = { ...params, search }
    }
    
    return query('/restocks', { params })
      .then(async res => {
        return res.data 
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const fetchSingleStock = async restockId => {
    return get('/restocks', restockId)
      .then(async data => {        
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const createNewStock = async payload => {
    return post('/restocks/', payload)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const editStock = async (id, payload) => {
    return createAxiosInstance(localStorage.getItem('baseUrl')).patch(`/restocks/${id}/`, { consignment_details: payload })
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const approveStock = async id => {
    return post(`restocks/approve_restock/${id}/`)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const rejectStock = async id => {
    return post(`restocks/cancel_restock/${id}/`)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const updateStock = async (restockId, payload) => {
    return put(`/restocks/${restockId}/`, payload)
      .then(async data => {    
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const deleteStock = async restockId => {
    return del(`/restocks/${restockId}/`)
      .then(async data => {    
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  return { errors, fetchAllStock, fetchSingleStock, createNewStock, updateStock, deleteStock, approveStock, rejectStock, editStock }
});
