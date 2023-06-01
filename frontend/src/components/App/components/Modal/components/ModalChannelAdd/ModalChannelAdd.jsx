import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import ModalBody from 'react-bootstrap/ModalBody';
import Form from 'react-bootstrap/Form';

import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';

import useSocketConnection from 'hooks/useSocketConnection';

import { selectAll } from 'slices/channelsSlice';

import { initialValues, validationSchema } from './constants';

const ModalChannelAdd = ({ onClose }) => {
    const inputRef = useRef(null);

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
                actions.setErrors({ channelName: 'Должно быть уникально' });
                actions.setSubmitting(false);
                return;
            }

            addNewChannel(channelName);
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
            <ModalHeader title="Добавить канал" />

            <ModalBody>
                <Form>
                    <Form.Control
                        ref={inputRef}
                        name="channelName"
                        placeholder="Введите имя нового канала"
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
                submitBtnText="Добавить"
                onClose={onClose}
                onSubmit={formik.handleSubmit}
            />
        </>
    );
};

export default ModalChannelAdd;
