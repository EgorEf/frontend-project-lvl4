import { io } from 'socket.io-client';

const getSocketInstance = () => {
  // "undefined" means the URL will be computed from the `window.location` object
  const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://localhost:3000';

  const socket = io(URL, {
    autoConnect: false,
  });

  return socket;
};

export default getSocketInstance;
