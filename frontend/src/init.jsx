import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AuthProvider from './components/AuthProvider';
import SocketProvider from 'components/SocketProvider';
import App from './components/App';

import store from 'slices';

const init = () => (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AuthProvider>
                    <SocketProvider>
                        <App />
                    </SocketProvider>
                </AuthProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

export default init;
