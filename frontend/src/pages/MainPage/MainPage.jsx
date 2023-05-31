import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Channels from './components/Channels';
import Messages from './components/Messages';

import { fetchData } from 'slices/channelsSlice';

import styles from './MainPage.module.css';

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <Container className={styles.mainPage}>
            <Row className={styles.contentBlock}>
                <Col
                    className={styles.firstColumn}
                    xxl={3}
                    xl={3}
                    lg={3}
                    md={3}
                    sm={3}
                    xs={5}
                >
                    <Channels />
                </Col>

                <Col
                    className="h-100"
                    xxl={9}
                    xl={9}
                    lg={9}
                    md={9}
                    sm={9}
                    xs={7}
                >
                    <Messages />
                </Col>
            </Row>
        </Container>
    );
};

export default MainPage;
