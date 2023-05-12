import { useContext } from 'react';

import SocketContext from '../contexts/SocketContext';

const useSocketConnection = () => useContext(SocketContext);

export default useSocketConnection;
