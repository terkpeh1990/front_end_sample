import { get } from "@/@core/services/ApiService";
import { createAxiosInstance } from '@/plugins/axios';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInventoryStore = defineStore('inventory', () => {
  const errors = ref({})
  
  // Actions
  const fetchInventory = async ({ payload, id }) => {
    return get(`/inventory/inventory_details/${id}`, payload)
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const fetchInventorySummary = async (url, param = { category_id__name: "", ordering: "", page: 1 }) => {
    return createAxiosInstance(url).get('/inventory/inventory_summery', { params: { ...param } })
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }
 
  const fetchInventoryGraph = async inventoryId => {
    return get(`/inventory/inventory_details/${inventoryId}/graph`)
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }
 
  const fetchInventoryAvailableQuantity = async inventoryId => {
    return get(`/inventory/inventory_details/${inventoryId}/avialable_quantity`)
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  return { errors, fetchInventory, fetchInventorySummary, fetchInventoryGraph, fetchInventoryAvailableQuantity }
});
