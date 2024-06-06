import axios from 'axios';
import {api, SINH_VIEN_API_URL,HOC_PHI_API_URL} from "../../api/apiConfig";



export const getDanhSachLop = async () => {
    try {
        const response = await api.get(`${SINH_VIEN_API_URL}/loc-ma-lop`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the list of Lop:', error);
        throw error; // Optionally, rethrow the error to handle it in the component
    }
};

export const findStudentByClassId = async (masv) => {
    try {
        const response = await api.get(`${SINH_VIEN_API_URL}/tim-sinh-vien`, {
            params: { 'ma-sv': masv.trim()},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching find the student by class ID:', error);
        throw error;
    }
};

export const DeleteStudent = async (masv) => {
    try {
        const response = await api.get(`${SINH_VIEN_API_URL}/xoa-sinh-vien`, {
            params: { 'ma-sv': masv},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching delete the student by class ID:', error);
        throw error;
    }
};

export const getStudentsByClassId = async (classId) => {
    try {
        const response = await api.get(`${SINH_VIEN_API_URL}/danh-sach-sv-lop`, {
            params: { 'ma-lop': classId.trim()},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching the students by class ID:', error);
        throw error;
    }
};
export const fetchStudentImage = async (imageName) => {
    try {
        const response = await api.get(`${SINH_VIEN_API_URL}get-img`, {
            params: { name: imageName },
            responseType: 'blob',
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching student image:', error);
        throw error;
    }
};
export const addNewStudent = async (sinhVien, avatarAdd) => {
    const formData = new FormData();
    formData.append('sv', JSON.stringify(sinhVien));
    formData.append('img', avatarAdd);

    try {
        const response = await api.post(`${SINH_VIEN_API_URL}/them-sinh-vien-moi`, formData, {
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
export const updateStudent = async (sinhVien, avatarAdd) => {
    const formData = new FormData();
    formData.append('sv', JSON.stringify(sinhVien));
    formData.append('img', avatarAdd);

    try {
        const response = await api.post(`${SINH_VIEN_API_URL}update-sv`, formData, {
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
export const getHocPhiSV = async (masv) => {
    try {
        const response = await api.get(`${HOC_PHI_API_URL}xem-hoc-phi-sv`, {
            params: { 'masv': masv.trim()},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching the students by class ID:', error);
        throw error;
    }
};