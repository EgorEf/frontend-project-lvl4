import * as Yup from 'yup';

export const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
};

export const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Минимальная длина имени должна быть больше 3 символов')
        .max(20, 'Слишком длинное имя')
        .required('Пожалуйста заполните поле'),
    password: Yup.string()
        .min(6, 'Слишком короткий пароль')
        .required('Пожалуйста заполните поле'),
    confirmPassword: Yup.string().required('Пожалуйста заполните поле')
});
