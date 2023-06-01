import { Routes, Route } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

import ROUTES from 'routes';

const AppRoutes = () => (
    <Routes>
        <Route
            path={ROUTES.login}
            element={<LoginPage />}
        />

        <Route
            exact
            path={ROUTES.main}
            element={(
                <PrivateRoute>
                    <MainPage />
                </PrivateRoute>
            )}
        />

        <Route
            path="*"
            element={<NotFoundPage />}
        />
    </Routes>
);

export default AppRoutes;
