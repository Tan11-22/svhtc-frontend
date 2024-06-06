import axios from 'axios';


const API_BASE_URL = '/api/';

export const MON_HOC_API_URL = `thong-tin/mon-hoc/`;
export const SINH_VIEN_API_URL = `thong-tin/sinh-vien/`;
export const LTC_API_URL = `lop-tin-chi/`;
export const GIANG_VIEN_API_URL = `thong-tin/giang-vien/`;
export const HOC_PHI_API_URL = `thanh-toan/`;

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  
