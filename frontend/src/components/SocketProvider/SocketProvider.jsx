import {
    useEffect,
    useMemo,
    useCallback
} from 'react';
import { useDispatch } from 'react-redux';

import SocketContext from 'contexts/SocketContext';

import { addMessage } from 'slices/messagesSlice';
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

        socket.on('newMessage', onNewMessage);

        return () => {
            socket.off('newMessage', onNewMessage);
        };
    }, [dispatch]);

    const contextState = useMemo(() => ({
        sendMessage: (messageData) => emit('newMessage', messageData)
    }), [emit]);

    return (
        <SocketContext.Provider value={contextState}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
