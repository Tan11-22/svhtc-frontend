import { useState } from 'react';
export const handleOpenDialog = (idDialog, selectedStudent) => {
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