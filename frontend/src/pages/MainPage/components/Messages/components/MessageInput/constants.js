import * as Yup from 'yup';

export const initialValues = {
  messageText: '',
};

export const validationSchema = Yup.object().shape({
  messageText: Yup.string().required(),
});
