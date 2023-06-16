import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import {
  selectCurrentChannelId,
  selectAll,
  getCurrentChannelId,
} from 'slices/channelsSlice';
import { showModal } from 'slices/modalSlice';

import { MODAL_TYPES } from 'constants';

import ChannelRemovable from './components/ChannelRemovable';
import Channel from './components/Channel';

import styles from './Channels.module.css';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(selectAll);
  const currentChannelId = useSelector(getCurrentChannelId);

  const onSelectChannel = useCallback((id) => () => (
    dispatch(selectCurrentChannelId(id))
  ), [dispatch]);

  const onShowModalByType = useCallback((type, channelId = null) => () => {
    const payload = {
      type,
      ...(channelId ? { extra: { channelId } } : {}),
    };
    dispatch(showModal(payload));
  }, [dispatch]);

  return (
    <>
      <Container className="d-flex justify-content-between py-4 mb-1">
        <h6 className="m-0">
          {t('Channels')}
        </h6>

        <Button
          type="button"
          variant=""
          className="p-0 text-primary btn-group-vertical"
          onClick={onShowModalByType(MODAL_TYPES.Add)}
        >
          <Image
            src="icons/plus-square.svg"
            fluid
          />

          <span className="visually-hidden">+</span>
        </Button>
      </Container>

      <Nav
        className={cn(styles.channelsList, 'flex-column flex-nowrap overflow-auto h-100')}
        as="ul"
      >
        {channels.map(({
          id,
          name,
          removable,
        }) => {
          const active = id === currentChannelId;

          return (
            <Nav.Item as="li" key={id}>
              {removable ? (
                <ChannelRemovable
                  name={name}
                  variant={active ? 'secondary' : ''}
                  onSelect={onSelectChannel(id)}
                  onRemove={onShowModalByType(MODAL_TYPES.Remove, id)}
                  onRename={onShowModalByType(MODAL_TYPES.Rename, id)}
                />
              ) : (
                <Channel
                  name={name}
                  variant={active ? 'secondary' : ''}
                  onSelect={onSelectChannel(id)}
                />
              )}
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
};

export default Channels;
