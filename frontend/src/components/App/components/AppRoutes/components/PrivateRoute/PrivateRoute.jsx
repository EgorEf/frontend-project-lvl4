import { Navigate, useLocation } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

import ROUTES from 'routes';

const PrivateRoute = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth ? (
            children
        ) : (
            <Navigate
                to={ROUTES.login}
                state={{ from: location }}
            />
        )
    );
};

export default PrivateRoute;
