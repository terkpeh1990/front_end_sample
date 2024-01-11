import { createAxiosInstance } from "@/plugins/axios";


export const useAdminStore = () => {
  const url = localStorage.getItem('baseUrl');

  const waitlist = ref([]);
  const meta = ref({});
  const loading = ref(false);

  const createNewUser = async ({ payload }) => {
    return createAxiosInstance(url).post('/user/admin/register/', payload)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const getAdminsList = async (page = 1, search = '', page_size) => {
    let params = { page, page_size }
    if (search !== '') {
      params = { ...params, search }
    }

    return createAxiosInstance(url).get('/user/list/', { params })
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const getWaitlist = async (page = 1, search = '', page_size) => {
    let params = { page, page_size }
    if (search !== '') {
      params = { ...params, search }
    }

    return createAxiosInstance(url).get('/waiting_list/', { params })
      .then(async res => {

        const { data, ...rest } = res.data;

        waitlist.value = data;
        meta.value = rest;
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const createWaitlist = async ({ payload }) => {
    return createAxiosInstance(url).post('/waiting_list/', payload)
      .then(async res => {
        console.log({ res })
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const updateWaitlist = async ({ payload }) => {
    return createAxiosInstance(url).patch('/waiting_list/', payload)
      .then(async res => {
        console.log({ res })
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const approveWaitlist = async id => {
    return createAxiosInstance(url).patch(`/waiting_list/approve/company/${id}/`)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const removeFromWaitlist = async id => {
    return createAxiosInstance(url).delete(`/waiting_list/${id}/`)
      .then(async res => {
        return res;
      }).catch(err => {
        return err.response
      })
  }

  const getSingleWaitlistCompany = async id => {
    console.log(url);
    
    return createAxiosInstance(url).get(`/waiting_list/${id}/`)
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  return { waitlist, meta, createNewUser,approveWaitlist, removeFromWaitlist, getSingleWaitlistCompany, getAdminsList, getWaitlist, createWaitlist }
}
