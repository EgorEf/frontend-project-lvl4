import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import ModalContent from '../ModalContent';

import useSocketConnection from 'hooks/useSocketConnection';

import { selectAll } from 'slices/channelsSlice';

import { initialValues, getValidationSchema } from './constants';

const ModalChannelAdd = ({ onClose }) => {
    const { t } = useTranslation();

    const channels = useSelector(selectAll);

    const { addNewChannel } = useSocketConnection();

    const onSubmit = ({ channelName }, actions) => {
        const hasNameInChannels = channels
            .map(({ name }) => name)
            .includes(channelName);

        if (hasNameInChannels) {
            actions.setErrors({ channelName: t('Form.Errors.Uniq') });
            actions.setSubmitting(false);
            return;
        }

        addNewChannel(channelName);
        onClose();
        toast.success(t('Toasts.Success.ChannelAdd'));
    };

    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={getValidationSchema(t)}
            onSubmit={onSubmit}
        >
            <ModalContent
                title={t('Modals.Add')}
                name="channelName"
                placeholder={t('Form.Fields.NewChannel')}
                submitBtnText={t('Buttons.Add')}
                cancelBtnText={t('Buttons.Cancel')}
                onClose={onClose}
            />
        </Formik>
    );
};

export default ModalChannelAdd;
