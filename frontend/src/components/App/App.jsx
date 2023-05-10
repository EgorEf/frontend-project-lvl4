import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import MainPage from '../../pages/MainPage';
import LoginPage from '../../pages/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';

import styles from './App.module.css';

const App = () => (
    <Container bsPrefix={styles.app}>
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<MainPage />}
                />

                <Route
                    path="login"
                    element={<LoginPage />}
                />

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    </Container>
);

export default App;
