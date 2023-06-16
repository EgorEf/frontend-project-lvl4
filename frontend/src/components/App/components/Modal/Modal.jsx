import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';

import { closeModal } from 'slices/modalSlice';
import { MODAL_TYPES } from 'constants';

import ModalChannelAdd from './components/ModalChannelAdd';
import ModalRenameChannel from './components/ModalRenameChannel';
import ModalRemoveChannel from './components/ModalRemoveChannel';

const renderModalContentByType = (modalType, onClose) => {
  if (modalType === MODAL_TYPES.Add) {
    return <ModalChannelAdd onClose={onClose} />;
  }

  if (modalType === MODAL_TYPES.Rename) {
    return <ModalRenameChannel onClose={onClose} />;
  }

  if (modalType === MODAL_TYPES.Remove) {
    return <ModalRemoveChannel onClose={onClose} />;
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
