import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';

import useSocketConnection from 'hooks/useSocketConnection';

import { selectAll, selectById } from 'slices/channelsSlice';

import { validationSchema } from './constants';

const ModalRenameChannel = ({ onClose }) => {
    const inputRef = useRef(null);

    const channels = useSelector(selectAll);
    const channelId = useSelector((state) => state.modal.extra?.channelId);
    const currentChannel = useSelector((state) => selectById(state, channelId));

    const { renameChannel } = useSocketConnection();

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            channelName: currentChannel.name
        },
        validationSchema,
        onSubmit: ({ channelName }, actions) => {
            const hasNameInChannels = channels
                .map(({ name }) => name)
                .includes(channelName);

            if (hasNameInChannels) {
                actions.setErrors({ channelName: 'Должно быть уникально' });
                actions.setSubmitting(false);
                return;
            }

            renameChannel(channelId, channelName);
            onClose();
        }
    });

    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
            <ModalHeader title="Переименовать канал" />

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Control
                        ref={inputRef}
                        name="channelName"
                        placeholder="Введите новое имя для канала"
                        value={formik.values.channelName}
                        onChange={formik.handleChange}
                        isInvalid={!formik.isValid}
                    />

                    {!formik.isValid && formik.touched.channelName && (
                        <Form.Text bsPrefix="text-danger">
                            {formik.errors.channelName}
                        </Form.Text>
                    )}
                </Form>
            </Modal.Body>

            <ModalFooter
                disabled={formik.isSubmitting}
                submitBtnText="Переименовать"
                onClose={onClose}
                onSubmit={formik.handleSubmit}
            />
        </>
    );
};

export default ModalRenameChannel;
