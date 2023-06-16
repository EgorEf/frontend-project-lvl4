import { Routes, Route } from 'react-router-dom';

import ROUTES from 'routes';

import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import NotFoundPage from 'pages/NotFoundPage';

import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    <Route
      path={ROUTES.login}
      element={<LoginPage />}
    />

    <Route
      path={ROUTES.signup}
      element={<SignupPage />}
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
