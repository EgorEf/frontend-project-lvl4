import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import ModalContent from '../ModalContent';

import useSocketConnection from 'hooks/useSocketConnection';

import { selectAll, selectById } from 'slices/channelsSlice';

import { getValidationSchema } from './constants';

const ModalRenameChannel = ({ onClose }) => {
    const { t } = useTranslation();

    const channels = useSelector(selectAll);
    const channelId = useSelector((state) => state.modal.extra?.channelId);
    const currentChannel = useSelector((state) => selectById(state, channelId));

    const { renameChannel } = useSocketConnection();

    const onSubmit = ({ channelName }, actions) => {
        const hasNameInChannels = channels
            .map(({ name }) => name)
            .includes(channelName);

        if (hasNameInChannels) {
            actions.setErrors({ channelName: t('Form.Errors.Uniq') });
            actions.setSubmitting(false);
            return;
        }

        renameChannel(channelId, channelName);
        onClose();
        toast.success(t('Toasts.Success.ChannelRename'));
    };

    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ channelName: currentChannel.name }}
            validationSchema={getValidationSchema(t)}
            onSubmit={onSubmit}
        >
            <ModalContent
                title={t('Modals.Rename')}
                name="channelName"
                placeholder={t('Form.Fields.RenameChannel')}
                submitBtnText={t('Buttons.Rename')}
                cancelBtnText={t('Buttons.Cancel')}
                onClose={onClose}
            />
        </Formik>
    );
};

export default ModalRenameChannel;
