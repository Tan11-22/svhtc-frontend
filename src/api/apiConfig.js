import axios from 'axios';





const API_BASE_URL = '/api/';

export const MON_HOC_API_URL = `thong-tin/mon-hoc/`;
export const LOP_API_URL = "thong-tin/lop-hoc/";
export const LOGIN_API_URL = "user/";
export const DK_LTC_API_URL = "lop-tin-chi/dang-ky/";
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
  
)

export default api;
  