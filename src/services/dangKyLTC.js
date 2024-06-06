import api from  "../api/apiConfig";
import { DK_LTC_API_URL} from "../api/apiConfig";

export const getDSLTCDeDK = async (maLop,maSV) => {
    try {
       
        const response = await api.get(`${DK_LTC_API_URL}danh-sach-ltc-de-dang-ky`, {
          params: {
            malop: maLop,
            masv : maSV
          }
        });
        // console.log(response.data);
        return response.data; // Trả về dữ liệu từ API
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
      }
}

export const getDanhSachThongTinLop = async () => {
    try {
        const response = await api.get(`${DK_LTC_API_URL}danh-sach-thong-tin-lop`)

        return response.data
    } catch (error) {
        throw error
    }
}


export const getDSLTCDaDK = async (maSV) => {
    try {
       
        const response = await api.get(`${DK_LTC_API_URL}danh-sach-ltc-da-dang-ky`, {
          params: {
            masv : maSV
          }
        });
        // console.log(response.data);
        return response.data; // Trả về dữ liệu từ API
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
      }
}


export const dangKyLTC = async (maLTC, maSV, soSVToiDa) => {
    try {
       const data = {
        "maltc": maLTC,
        "masv":maSV,
        "svtoida": soSVToiDa
       }
        const response = await api.post(`${DK_LTC_API_URL}dang-ky-moi`,data);
        // console.log(response.data);
        return response.data; // Trả về dữ liệu từ API
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
      }
}

export const huyDangKyLTC = async (maLTC, maSV) => {
    try {
       const data = {
        "maltc": maLTC,
        "masv":maSV
       }
        const response = await api.post(`${DK_LTC_API_URL}huy-dang-ky`,data);
        // console.log(response.data);
        return response.data; // Trả về dữ liệu từ API
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Ném lỗi để xử lý phía ngoài nếu cần thiết
      }
}