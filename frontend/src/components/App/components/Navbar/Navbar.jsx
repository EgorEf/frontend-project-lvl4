import { useTranslation } from 'react-i18next';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import NavbarBrandLink from './components/NavbarBrandLink';

import useAuth from 'hooks/useAuth';

import styles from './Navbar.module.css';

const NavbarComponent = () => {
    const { t } = useTranslation();
    const { auth, logOut } = useAuth();

    const onExitClick = () => logOut();

    return (
        <Navbar className={styles.navbar}>
            <Container>
                <Navbar.Brand as={NavbarBrandLink}>
                    My-Test-Chat
                </Navbar.Brand>

                {auth && (
                    <Button onClick={onExitClick}>
                        {t('Buttons.LogOut')}
                    </Button>
                )}
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
