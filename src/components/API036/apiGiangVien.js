import api,{ GIANG_VIEN_API_URL} from "../../api/apiConfig";
export const getDanhSachKhoa = async () => {
    try {
        const response = await api.get(`${GIANG_VIEN_API_URL}/loc-ma-khoa`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the list of Khoa:', error);
        throw error; // Optionally, rethrow the error to handle it in the component
    }
};
export const getDanhSachGiangVien = async (makhoa) => {
    try {
        const response = await api.get(`${GIANG_VIEN_API_URL}/loc-gv-khoa`, {
            params: { 'ma-khoa': makhoa.trim()},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Gvlist:', error);
        throw error;
    }
};
export const addGiangVien = async (giangVien, avatarAdd) => {
    const formData = new FormData();
    formData.append('gv', JSON.stringify(giangVien));
    formData.append('img', avatarAdd);

    try {
        const response = await api.post(`${GIANG_VIEN_API_URL}them-giang-vien`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding new student:', error);
        throw error;
    }
};
export const updateGiangVien = async (giangVien, avatarAdd) => {
    const formData = new FormData();
    formData.append('gv', JSON.stringify(giangVien));
    formData.append('img', avatarAdd);

    try {
        const response = await api.post(`${GIANG_VIEN_API_URL}update-gv`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding new student:', error);
        throw error;
    }
};
export const fetchImage = async (imageName) => {
    try {
        const response = await api.get(`${GIANG_VIEN_API_URL}get-img`, {
            params: { name: imageName },
            responseType: 'blob',
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching student image:', error);
        throw error;
    }
};
export const DeleteGiangVien = async (magv) => {
    try {
        const response = await api.get(`${GIANG_VIEN_API_URL}xoa-giang-vien`, {
            params: { 'ma-gv': magv},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching delete the student by class ID:', error);
        throw error;
    }
};