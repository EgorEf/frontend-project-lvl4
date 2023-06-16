import * as Yup from 'yup';

export const initialValues = {
  channelName: '',
};

export const getValidationSchema = (t) => Yup.object().shape({
  channelName: Yup.string()
    .min(3, t('Form.Errors.LengthLimit'))
    .max(20, t('Form.Errors.LengthLimit'))
    .required(t('Form.Errors.Required')),
});
