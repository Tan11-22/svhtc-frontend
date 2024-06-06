import { useState } from 'react';
export const handleOpenDialog = (idDialog) => {
    const dialog = document.getElementById(idDialog);
    if (dialog) {
      dialog.style.display = 'block';
    }
}
export const handleCloseDialog = (dialogId) => {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.style.display = 'none';
    }
};


export const useForm = (initialFormValues) => {
    const [values, setValues] = useState(initialFormValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const resetForm = () => {
        setValues(initialFormValues);
    };

    return {
        values,
        handleChange,
        setFormValues: setValues,
        resetForm,
    };
};
export const previewImage = (event, imgId) => {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
            const img = document.getElementById(imgId);
            if (img) {
                img.src = reader.result;
            } else {
                console.error("Không tìm thấy phần tử hình ảnh với ID " + imgId);
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
};
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Đảm bảo rằng các số được hiển thị với hai chữ số
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Trả về ngày tháng năm đã được định dạng
    return `${formattedDay}-${formattedMonth}-${year}`;
};