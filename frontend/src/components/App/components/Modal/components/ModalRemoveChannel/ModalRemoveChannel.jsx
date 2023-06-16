import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import useSocketConnection from 'hooks/useSocketConnection';

const ModalRemoveChannel = ({ onClose }) => {
  const { t } = useTranslation();

  const { extra } = useSelector((state) => state.modal);

  const { removeChannel } = useSocketConnection();

  const onClickRemove = (channelId) => () => {
    removeChannel(channelId);
    toast.success(t('Toasts.Success.ChannelRemove'));
    onClose();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('Modals.Remove')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t('YouSure')}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
        >
          {t('Buttons.Cancel')}
        </Button>

        <Button
          variant="danger"
          onClick={onClickRemove(extra.channelId)}
        >
          {t('Buttons.Delete')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalRemoveChannel;
