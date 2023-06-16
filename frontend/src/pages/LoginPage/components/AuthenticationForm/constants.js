import * as Yup from 'yup';

export const initialValues = {
  username: '',
  password: '',
};

export const getValidationSchema = (t) => (
  Yup.object().shape({
    username: Yup.string().required(t('Form.Errors.Required')),
    password: Yup.string().required(t('Form.Errors.Required')),
  })
);
