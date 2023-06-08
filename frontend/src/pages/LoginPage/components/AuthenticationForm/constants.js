import * as Yup from 'yup';

export const initialValues = {
    username: '',
    password: ''
};

export const validationSchema = Yup.object().shape({
    username: Yup.string().required('Пожалуйста заполните поле'),
    password: Yup.string().required('Пожалуйста заполните поле')
});
