import {
    useEffect,
    useMemo,
    useCallback
} from 'react';
import { useDispatch } from 'react-redux';

import SocketContext from 'contexts/SocketContext';

import { addMessage } from 'slices/messagesSlice';
import {
    addNewChannel,
    selectCurrentChannelId,
    removeChannel,
    renameChannel
} from 'slices/channelsSlice';

import DEFAULT_CHANNEL_ID from 'constants';

import socket from 'socket';

const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();

    const emit = useCallback((eventName, data) => {
        socket.timeout(1000).emit(eventName, data, (err) => {
            if (err) {
                emit(eventName, data);
            }
        });
    }, []);

    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const onNewMessage = (payload) => {
            dispatch(addMessage(payload));
        };

        const onAddNewChannel = (payload) => {
            dispatch(addNewChannel(payload));
            dispatch(selectCurrentChannelId(payload.id));
        };

        const onRemoveChannel = ({ id }) => {
            dispatch(removeChannel(id));
            dispatch(selectCurrentChannelId(DEFAULT_CHANNEL_ID));
        };

        const onRenameChannel = (payload) => {
            dispatch(renameChannel(payload));
        };

        socket.on('newMessage', onNewMessage);
        socket.on('newChannel', onAddNewChannel);
        socket.on('removeChannel', onRemoveChannel);
        socket.on('renameChannel', onRenameChannel);

        return () => {
            socket.off('newMessage', onNewMessage);
            socket.off('newChannel', onAddNewChannel);
            socket.off('removeChannel', onRemoveChannel);
            socket.off('renameChannel', onRenameChannel);
        };
    }, [dispatch]);

    const contextState = useMemo(() => ({
        sendMessage: (messageData) => emit('newMessage', messageData),
        addNewChannel: (name) => emit('newChannel', { name }),
        removeChannel: (id) => emit('removeChannel', { id }),
        renameChannel: (id, name) => emit('renameChannel', { id, name })
    }), [emit]);

    return (
        <SocketContext.Provider value={contextState}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
