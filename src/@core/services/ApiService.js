import axios from "axios";
import { destroyToken, getToken } from "./JwtService";


const instance = axios.create();

instance.interceptors.request.use(config => {
  config.baseURL = `https://${localStorage.getItem('baseUrl')}`;

  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken() ? `Bearer ${getToken()}` : null,
    },
  };
});

export const setHeader = () => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
  instance.defaults.headers.common["Accept"] = "application/json";
};

export const deleteAuthHeader = () => {
  destroyToken();
};

export const query = async (resource, params) => {
  
  return instance.get(resource, params);
};

export const get = async (resource, slug = "") => {
  return instance.get(`${resource}/${slug}`);
};

export const post = async (resource, params) => {
  return instance.post(`${resource}`, params);
};

export const update = async (resource, slug, params) => {
  return instance.patch(`${resource}/${slug}/`, params);
};

export const put = async (resource, params) => {
  return instance.put(`${resource}`, params);
};

export const del = async resource => {
  return instance.delete(resource);
};
