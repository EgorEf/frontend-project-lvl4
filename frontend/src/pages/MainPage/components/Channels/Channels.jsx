import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import Channel from './components/Channel';

import useSocketConnection from 'hooks/useSocketConnection';

import {
    selectCurrentChannelId,
    selectAll,
    getCurrentChannelId
} from 'slices/channelsSlice';
import { showModal } from 'slices/modalSlice';

import styles from './Channels.module.css';

const Channels = () => {
    const dispatch = useDispatch();

    const channels = useSelector(selectAll);
    const currentChannelId = useSelector(getCurrentChannelId);

    const { removeChannel } = useSocketConnection();

    const onSelectChannel = useCallback((id) => () => (
        dispatch(selectCurrentChannelId(id))
    ), [dispatch]);

    const onRemoveChannel = useCallback((id) => () => (
        removeChannel(id)
    ), [removeChannel]);

    const onShowModalAddChannel = useCallback(() => (
        dispatch(showModal({ type: 'addChannel' }))
    ), [dispatch]);

    const onShowModalRenameChannel = useCallback((channelId) => () => (
        dispatch(showModal({
            type: 'renameChannel',
            extra: { channelId }
        }))
    ), [dispatch]);

    return (
        <>
            <Container className="d-flex justify-content-between py-4 mb-1">
                <h6 className="m-0">
                    Каналы
                </h6>

                <Button
                    type="button"
                    variant=""
                    className="p-0 text-primary btn-group-vertical"
                    onClick={onShowModalAddChannel}
                >
                    <Image
                        src="icons/plus-square.svg"
                        fluid
                    />
                </Button>
            </Container>

            <Nav
                className={cn(styles.channelsList, 'flex-column flex-nowrap overflow-auto h-100')}
                as="ul"
            >
                {channels.map(({
                    id,
                    name,
                    removable
                }) => (
                    <Channel
                        key={id}
                        id={id}
                        active={id === currentChannelId}
                        name={name}
                        removable={removable}
                        onSelect={onSelectChannel(id)}
                        onRemove={onRemoveChannel(id)}
                        onRename={onShowModalRenameChannel(id)}
                    />
                ))}
            </Nav>
        </>
    );
};

export default Channels;
