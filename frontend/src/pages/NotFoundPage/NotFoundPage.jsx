import React from 'react';

import Container from 'react-bootstrap/Container';

import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
    <Container bsPrefix={styles.notFoundPage}>
        <h1 className={styles.error}>
            404
        </h1>

        <h2 className={styles.errorText}>
            Sorry. Page not found
        </h2>
    </Container>
);

export default NotFoundPage;
