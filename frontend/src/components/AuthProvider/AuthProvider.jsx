import { useState, useMemo } from 'react';

import AuthContext from 'contexts/AuthContext';

import { getToken } from 'utils';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(!!getToken());

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setAuth(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setAuth(false);
  };

  const contextState = useMemo(() => ({
    auth,
    logIn,
    logOut,
  }), [auth]);

  return (
    <AuthContext.Provider value={contextState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
