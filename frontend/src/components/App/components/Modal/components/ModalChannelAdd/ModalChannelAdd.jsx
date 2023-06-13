import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import ModalBody from 'react-bootstrap/ModalBody';
import Form from 'react-bootstrap/Form';

import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';

import useSocketConnection from 'hooks/useSocketConnection';

import { selectAll } from 'slices/channelsSlice';

import { initialValues, validationSchema } from './constants';

const ModalChannelAdd = ({ onClose }) => {
    const inputRef = useRef(null);
    const { t } = useTranslation();

    const channels = useSelector(selectAll);

    const { addNewChannel } = useSocketConnection();

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues,
        validationSchema,
        onSubmit: ({ channelName }, actions) => {
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
        }
    });

    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
            <ModalHeader title={t('Modals.Add')} />

            <ModalBody>
                <Form>
                    <Form.Control
                        ref={inputRef}
                        name="channelName"
                        placeholder={t('Form.Fields.NewChannel')}
                        onChange={formik.handleChange}
                        isInvalid={!formik.isValid}
                    />

                    {!formik.isValid && formik.touched.channelName && (
                        <Form.Text bsPrefix="text-danger">
                            {formik.errors.channelName}
                        </Form.Text>
                    )}
                </Form>
            </ModalBody>

            <ModalFooter
                disabled={formik.isSubmitting}
                submitBtnText={t('Buttons.Add')}
                cancelBtnText={t('Buttons.Cancel')}
                onClose={onClose}
                onSubmit={formik.handleSubmit}
            />
        </>
    );
};

export default ModalChannelAdd;
