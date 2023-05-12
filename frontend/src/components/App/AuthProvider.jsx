import { useState, useMemo } from 'react';

import AuthContext from '../../contexts/AuthContext';

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(!!localStorage.getItem('userId'));

    const logIn = (token) => {
        localStorage.setItem('userId', token);
        setAuth(true);
    };

    const logOut = () => {
        localStorage.removeItem('userId');
        setAuth(false);
    };

    const contextState = useMemo(() => ({
        auth,
        logIn,
        logOut
    }), [auth]);

    return (
        <AuthContext.Provider value={contextState}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
