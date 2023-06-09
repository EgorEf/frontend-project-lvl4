import * as Yup from 'yup';

export const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
};

export const getValidationSchema = (t) => Yup.object().shape({
    username: Yup.string()
        .min(3, t('Form.Errors.LengthLimit'))
        .max(20, t('Form.Errors.LengthLimit'))
        .required(t('Form.Errors.Required')),
    password: Yup.string()
        .min(6, t('Form.Errors.Short'))
        .required(t('Form.Errors.Required')),
    confirmPassword: Yup.string().required(t('Form.Errors.Required'))
});

export const validateConfirmPassword = (password) => (newPassword) => {
    if (password !== newPassword) {
        return 'Пароли должны совпадать';
    }

    return null;
};
