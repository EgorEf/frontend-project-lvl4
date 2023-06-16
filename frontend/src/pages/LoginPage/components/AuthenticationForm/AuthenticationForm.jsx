import { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import FormInput from 'components/FormInput';

import useAuth from 'hooks/useAuth';

import API from 'api';

import ROUTES from 'routes';

import { ERRORS_TYPES } from 'constants';
import { initialValues, getValidationSchema } from './constants';

import styles from './AuthenticationForm.module.css';

const AuthenticationForm = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = useCallback(async ({ username, password }, actions) => {
    try {
      const userData = await API.login(username, password);
      logIn(userData);
      navigate(ROUTES.main, { replace: true });
    } catch ({ code, response }) {
      if (response?.status === ERRORS_TYPES.Unauthorized) {
        actions.setErrors({
          username: ' ',
          password: t('Form.Errors.NameOrPassword'),
        });
      }

      if (code === 'ERR_NETWORK') {
        toast.error(t('Toasts.Error.Connection'));
      }
    }
  }, [logIn, navigate, t]);

  return (
    <Card>
      <Card.Header>
        <Card.Title className="p-3 text-center" as="h1">
          {t('Entrance')}
        </Card.Title>
      </Card.Header>

      <Card.Body className="p-5 pb-4">
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(t)}
          onSubmit={onSubmit}
        >
          {({ errors }) => (
            <Form>
              <Field
                type="text"
                name="username"
                label={t('Form.Fields.Nickname')}
                autocomplete="username"
                component={FormInput}
              />

              <Field
                type="password"
                name="password"
                label={t('Form.Fields.Password')}
                autocomplete="current-password"
                component={FormInput}
              />

              <Button
                className={styles.formButton}
                type="submit"
                variant="primary"
                disabled={errors.username || errors.password}
              >
                {t('Buttons.LogIn')}
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>

      <Card.Footer className="p-3 text-center">
        <span className="px-1">
          {t('NotAccaunt')}
        </span>

        <Link to={ROUTES.signup} replace>
          {t('Registration')}
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default AuthenticationForm;
