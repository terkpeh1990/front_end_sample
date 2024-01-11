import { getToken } from '@/@core/services/JwtService';
import axios from 'axios';


export const createAxiosIns = () => {
  const axiosIns = axios.create()
  
  axiosIns.interceptors.request.use(config => {
    config.baseURL = `https://${localStorage.getItem('baseUrl')}`;
  
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
      },
    };
  });
  
  return axiosIns;
}


export const createAxiosInstance = baseUrl => {
  const axiosCustom = axios.create()
  
  axiosCustom.interceptors.request.use(config => {
    config.baseURL = `https://${baseUrl}`;
  
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,

      },
    };
  });

  return axiosCustom;
}

