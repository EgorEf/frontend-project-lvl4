import Container from 'react-bootstrap/Container';

import AuthenticationForm from './components/AuthenticationForm';

import styles from './LoginPage.module.css';

const LoginPage = () => (
    <Container bsPrefix={styles.loginPage}>
        <AuthenticationForm />
    </Container>
);

export default LoginPage;
