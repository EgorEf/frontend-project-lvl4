import * as Yup from 'yup';

export const initialValues = {
    username: '',
    password: ''
};

export const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Минимальная длина имени должна быть больше 3 символов')
        .max(50, 'Слишком длинное имя')
        .required('Пожалуйста заполните поле'),
    password: Yup.string()
        .min(3, 'Слишком короткий пароль')
        .max(50, 'Слишком длинное имя')
        .required('Пожалуйста заполните поле')
});
