
import api,{LTC_API_URL } from '../../api/apiConfig';
export const getDanhSachKhoa = async () => {
    try {
        const response = await api.get(`${LTC_API_URL}/loc-ma-khoa`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the list of Khoa:', error);
        throw error; // Optionally, rethrow the error to handle it in the component
    }
};
export const getDanhSachNienKhoa = async () => {
    try {
        const response = await api.get(`${LTC_API_URL}/loc-nien-khoa`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the list of Khoa:', error);
        throw error; // Optionally, rethrow the error to handle it in the component
    }
};
export const getDanhSachMonHoc= async () => {
    try {
        const response = await api.get(`${LTC_API_URL}/loc-mon-hoc`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the list of MonHoc:', error);
        throw error; // Optionally, rethrow the error to handle it in the component
    }
};
export const getDanhSachGiangVien = async (makhoa) => {
    try {
        const response = await api.get(`${LTC_API_URL}/loc-gv-khoa`, {
            params: { 'ma-khoa': makhoa.trim()},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Gvlist:', error);
        throw error;
    }
};
export const getDanhSachLop = async (makhoa) => {
    try {
        const response = await api.get(`${LTC_API_URL}/loc-lop-khoa`, {
            params: { 'ma-khoa': makhoa.trim()},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching classlist:', error);
        throw error;
    }
};

export const getDanhSachLTC = async (makhoa,nienkhoa,hocki) => {
    try {
        const response = await api.get(`${LTC_API_URL}/loc-ltc`, {
            params: { 'ma-khoa': makhoa.trim(),
                        'nien-khoa': nienkhoa,
                        'hoc-ki': hocki
                    }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching find LTC', error);
        throw error;
    }
};

export const addLTC = async (ltcData) => {
    try {
        const response = await api.post(`${LTC_API_URL}/them-ltc`, ltcData);
        return response.data;
    } catch (error) {
        console.error('Error adding LTC:', error);
        throw error;
    }
};
export const updateLTC = async (ltcData) => {
    try {
        const response = await api.post(`${LTC_API_URL}/update-ltc`, ltcData);
        return response.data;
    } catch (error) {
        console.error('Error updating LTC:', error);
        throw error;
    }
};
export const deleteLTC = async (maltc) => {
    try {
        const response = await api.get(`${LTC_API_URL}/xoa-ltc`, {
            params: {
                'maltc': maltc
            }
        });
        return response.status; // Trả về dữ liệu từ phản hồi nếu cần
    } catch (error) {
        console.error('Error deleting LTC:', error);
        throw error;
    }
};
export const ktLTC = async (maltc) => {
    try {
        const response = await api.get(`${LTC_API_URL}/kt-ltc`, {
            params: {
                'maltc': maltc
            }
        });
        return response.data; // Trả về dữ liệu từ phản hồi nếu cần
    } catch (error) {
        console.error('Error deleting LTC:', error);
        throw error;
    }
};