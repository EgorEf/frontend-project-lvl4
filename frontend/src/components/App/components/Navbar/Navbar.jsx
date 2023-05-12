import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import useAuth from '../../../../hooks/useAuth';

import { PAGES_ROUTES } from '../../../../routes';

import styles from './Navbar.module.css';

const NavbarComponent = () => {
    const { auth, logOut } = useAuth();
    const onExitClick = () => logOut();

    return (
        <Navbar
            className={styles.navbar}
            // fixed="top"
        >
            <Container>
                <Navbar.Brand href={PAGES_ROUTES.main}>
                    My-Test-Chat
                </Navbar.Brand>

                {auth && (
                    <Button onClick={onExitClick}>
                        Выйти
                    </Button>
                )}
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
