import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AuthProvider from './components/AuthProvider';
import SocketProvider from 'components/SocketProvider';
import App from './components/App';

import { getSocketInstance, initI18n } from 'services';

import store from 'slices';

const init = async () => {
    const socket = getSocketInstance();
    await initI18n();

    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <AuthProvider>
                        <SocketProvider socket={socket}>
                            <App />
                        </SocketProvider>
                    </AuthProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
};

export default init;
