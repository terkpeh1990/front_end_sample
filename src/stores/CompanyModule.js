import { del, get, post, query, update } from "@/@core/services/ApiService";
import { createAxiosInstance } from '@/plugins/axios';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompanyStore = defineStore('company', () => {
  const errors = ref({})
  
  // Actions
  const fetchAllCompanies = async (page = 1, search = '', page_size) => {
    errors.value = '';
    let params = { page, page_size }
    if (search !== '') {
      params = { ...params, search }
    }

    return query('/companies', { params })
      .then(async res => {
        return res
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const fetchSingleCompany = async companyId => {
    return get('/companies', companyId)
      .then(async data => {        
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const fetchCompanyByID = async companyId => {
    return get(`/companies/${companyId}`)
      .then(async data => {        
        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const createNewCompany = async payload => {
    return post('/companies/', payload)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const updateCompany = async ({ id, ...payload }) => {
    return update('/companies', id, payload)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const deleteCompany = async companyId => {
    return del('/companies/', companyId)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;

        return err.response
      });
  }

  const createNewCompanyUser = async (baseUrl, payload) => {
    return createAxiosInstance(baseUrl).post('/user/register/', payload)
      .then(async data => {    

        return data;
      }).catch(err => {
        errors.value = err.message;
        
        return err.response
      });
  }

  const url  = localStorage.getItem('baseUrl');

  const updateCompanyDetails = async ({ companyId, payload }) => {
    return createAxiosInstance(url).patch(`/companies/${companyId}/`, payload)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  return { errors, fetchAllCompanies, fetchSingleCompany, createNewCompany, createNewCompanyUser, updateCompany, fetchCompanyByID, updateCompanyDetails }
});
