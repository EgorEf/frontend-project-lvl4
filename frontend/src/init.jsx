import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import AuthProvider from './components/AuthProvider';
import SocketProvider from 'components/SocketProvider';
import App from './components/App';

import { getSocketInstance, initI18n, initLeoProfanity } from 'services';

import store from 'slices';

const rollbarConfig = {
  accessToken: 'b7803267fdbe4c3093eece4893868540',
  environment: 'production',
};

const init = async () => {
  const socket = getSocketInstance();
  await initI18n();
  await initLeoProfanity();

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <BrowserRouter>
              <AuthProvider>
                <SocketProvider socket={socket}>
                  <App />
                </SocketProvider>
              </AuthProvider>
            </BrowserRouter>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
