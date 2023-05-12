import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FormGroup from './components/FormGroup';

import useAuth from 'hooks/useAuth';

import { API_ROUTES, PAGES_ROUTES } from 'routes';
import { initialValues, validationSchema } from './constants';

import styles from './AuthenticationForm.module.css';

const AuthenticationForm = () => {
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            const { data } = await axios.post(API_ROUTES.login, values);
            logIn(data);
            navigate(PAGES_ROUTES.main, { replace: true });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <h1 className={styles.title}>
                Вход
            </h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formikProps) => (
                    <Form
                        className={styles.form}
                        onSubmit={formikProps.handleSubmit}
                    >
                        <FormGroup
                            fieldName="username"
                            label="Имя пользователя"
                            placeholder="Имя пользователя"
                            onChange={formikProps.handleChange}
                        />

                        <FormGroup
                            fieldName="password"
                            label="Пароль"
                            placeholder="Пароль"
                            onChange={formikProps.handleChange}
                        />

                        <Button
                            className={styles.formButton}
                            type="submit"
                            variant="primary"
                        >
                            Войти
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AuthenticationForm;
