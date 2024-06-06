import api from  "../api/apiConfig";
import { LOGIN_API_URL} from "../api/apiConfig";


export const dangNhap = async (user) => {
    try {
        const response = await api.post(`${LOGIN_API_URL}login`, user);
        if(response.status == 200) {
            const token  = response.data.token;
            const username = response.data.user;
            const role = response.data.role;
            console.log(token)
            localStorage.setItem('token', token); 
            localStorage.setItem("username",username)
            localStorage.setItem("role",role)
        }
        // Lưu trữ token vào localStorage
        return response;
    } catch (error) {
        console.error('Error during login', error);
        throw error;
    }
};

export const resetPass = async (data) => {
    try {
        const response = await api.get(`${LOGIN_API_URL}quen-mat-khau`, 
        {
            params: {
              username: data.username,
              email: data.email
            }
          }
        );
        return response.data
    } catch (error) {
        console.error('Error during reset password', error);
        throw error;
    }
}