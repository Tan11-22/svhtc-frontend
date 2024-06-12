import api from  "../api/apiConfig";
import {LOP_API_URL} from "../api/apiConfig";


export const getLopHoc = async (start, size) => {
    try {
        const response = await api.get(`${LOP_API_URL}danh-sach-lop-hoc`, {
          params: {
            start: start,
            size: size
          }
        });
        // console.log(response.data);
        return response.data; // Trả về dữ liệu từ API
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
      }
}

export const getSoLuongLopHoc = async () => {
  try {
      const response = await api.get(`${LOP_API_URL}so-luong-lop-hoc`);
      console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}

export const timLopHoc = async (query) => {
  console.log("check",query)
  try {
    const response = await api.get(`${LOP_API_URL}tim-lop-hoc`,
      {
        params: {
          search: query
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
  }
}


export const themLopHoc = async (lop) => {
  try {
      const response = await api.post(`${LOP_API_URL}them-lop-moi`, lop);
      // console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}

export const xoaLopHoc = async (ma) => {
  try {
      const response = await api.get(`${LOP_API_URL}xoa-lop-hoc`, {
        params: {
          malop: ma
        }
      });
      // console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}

export const chinhSuaLopHoc = async (lop) => {
  try {
      const response = await api.post(`${LOP_API_URL}thay-doi-lop`, lop);
      // console.log(response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
    }
}

export const getDanhSachHe = async () => {
  try {
    const response = await api.get(`${LOP_API_URL}danh-sach-he`)

    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
  }
}


export const getDanhSachKhoa = async () => {
  try {
    const response = await api.get(`${LOP_API_URL}danh-sach-khoa`)

    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
      throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
  }
}