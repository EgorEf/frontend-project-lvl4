import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import MainPage from '../../pages/MainPage';
import LoginPage from '../../pages/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';

import AuthProvider from './AuthProvider';

import { PAGES_ROUTES } from '../../routes';

import styles from './App.module.css';

const App = () => (
    <Container bsPrefix={styles.app}>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={PAGES_ROUTES.login}
                        element={<LoginPage />}
                    />

                    <Route
                        exact
                        path={PAGES_ROUTES.main}
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
            </BrowserRouter>
        </AuthProvider>
    </Container>
);

export default App;
