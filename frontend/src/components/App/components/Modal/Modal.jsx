import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';

import ModalChannelAdd from './components/ModalChannelAdd';
import ModalRenameChannel from './components/ModalRenameChannel';

import { closeModal } from 'slices/modalSlice';

const renderModalContentByType = (modalType, onClose) => {
    if (modalType === 'addChannel') {
        return <ModalChannelAdd onClose={onClose} />;
    }

    if (modalType === 'renameChannel') {
        return <ModalRenameChannel onClose={onClose} />;
    }
    return null;
};

const ModalRoot = () => {
    const dispatch = useDispatch();

    const { type, show } = useSelector((state) => state.modal);

    const onCloseModal = useCallback(() => (
        dispatch(closeModal())
    ), [dispatch]);

    return (
        <Modal
            centered
            show={show}
            onHide={onCloseModal}
        >
            {renderModalContentByType(type, onCloseModal)}
        </Modal>
    );
};

export default ModalRoot;
