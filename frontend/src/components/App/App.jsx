import Navbar from './components/Navbar';
import AppRoutes from './components/AppRoutes';

import styles from './App.module.css';

const App = () => (
    <div className={styles.app}>
        <Navbar />

        <div className={styles.pageContent}>
            <AppRoutes />
        </div>
    </div>
);

export default App;
