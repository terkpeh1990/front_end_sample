import { get, post, query } from '@/@core/services/ApiService';
import { createAxiosInstance } from "@/plugins/axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore('product', () => {
 
  const url  = localStorage.getItem('baseUrl');

  const fetchProducts = async (page = 1, search = '', page_size) => {
    let params = { page, page_size }
    if (search !== '') {
      params = { ...params, search }
    }
    
    return createAxiosInstance(url).get('/products', { params })
      .then(async res => {
        
        return res.data;
      }).catch(err => {
        return err.response
      })
  }

  const createProduct = async payload => {
    return post('/products/', payload)
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  return { fetchProducts, createProduct }

})
