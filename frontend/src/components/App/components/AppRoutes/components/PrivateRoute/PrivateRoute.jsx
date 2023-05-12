import { Navigate, useLocation } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

import { PAGES_ROUTES } from 'routes';

const PrivateRoute = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth ? (
            children
        ) : (
            <Navigate
                to={PAGES_ROUTES.login}
                state={{ from: location }}
            />
        )
    );
};

export default PrivateRoute;
