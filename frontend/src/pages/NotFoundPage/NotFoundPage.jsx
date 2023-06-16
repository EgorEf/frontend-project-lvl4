import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from 'react-bootstrap/Container';

import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className={styles.notFoundPage}>
      <h1 className={styles.error}>
        {t('NotFoundPage.Code')}
      </h1>

      <h2 className={styles.errorText}>
        {t('NotFoundPage.Text')}
      </h2>
    </Container>
  );
};
export default NotFoundPage;
