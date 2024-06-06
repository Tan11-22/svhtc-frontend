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