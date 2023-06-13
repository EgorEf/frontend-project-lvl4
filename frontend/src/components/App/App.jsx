import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import AppRoutes from './components/AppRoutes';
import Modal from './components/Modal';

import styles from './App.module.css';

const App = () => (
    <div className={styles.app}>
        <Navbar />

        <div className={styles.pageContent}>
            <AppRoutes />
        </div>

        <Modal />

        <ToastContainer
            position="top-right"
            autoClose="5000"
            theme="light"
            closeOnClick
        />
    </div>
);

export default App;
