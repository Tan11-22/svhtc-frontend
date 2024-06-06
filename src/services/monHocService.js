import api from  "../api/apiConfig";
import {MON_HOC_API_URL} from "../api/apiConfig";


export const getMonHoc = async (start, size) => {
    try {
        const response = await api.get(`${MON_HOC_API_URL}danh-sach-mon-hoc`, {
          params: {
            start: start,
            size: size
          }
        });
        console.log(response.data);
        return response.data; // Trả về dữ liệu từ API
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
      }
}

export const getSoLuongMonHoc = async () => {
  try {
      const response = await api.get(`${MON_HOC_API_URL}so-luong-mon-hoc`);
      console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}

export const timMonHoc = async (search) => {
  try {
      const response = await api.get(`${MON_HOC_API_URL}tim-mon-hoc`, {
        params: {
          search: search
        }
      });
      // console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}

export const themMonHoc = async (monhoc) => {
  try {
      const response = await api.post(`${MON_HOC_API_URL}them-mon-hoc`, monhoc);
      // console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}

export const xoaMonHoc = async (maMH) => {
  try {
      const response = await api.get(`${MON_HOC_API_URL}xoa-mon-hoc`, {
        params: {
          mamh: maMH
        }
      });
      // console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}

export const chinhSuaMonHoc = async (monhoc) => {
  try {
      const response = await api.post(`${MON_HOC_API_URL}chinh-sua-mon-hoc`, monhoc);
      // console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}