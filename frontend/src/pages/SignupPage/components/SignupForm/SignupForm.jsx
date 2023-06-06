import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FormInput from 'components/FormInput';

import API from 'api';

import useAuth from 'hooks/useAuth';

import ROUTES from 'routes';
import { ERRORS_TYPES } from 'constants';
import { initialValues, validationSchema } from './constants';

const SignupForm = () => {
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const onSubmit = useCallback(async ({ username, password }, actions) => {
        try {
            const userData = await API.signup(username, password);
            logIn(userData);
            navigate(ROUTES.main, { replace: true });
        } catch ({ response }) {
            if (response.status === ERRORS_TYPES.Conflict) {
                actions.setErrors({
                    username: ' ',
                    password: ' ',
                    confirmPassword: 'Такой пользователь уже существует'
                });
            }
        }
    }, [logIn, navigate]);

    return (
        <Card>
            <Card.Header>
                <Card.Title className="p-3 text-center" as="h1">
                    Регистрация
                </Card.Title>
            </Card.Header>

            <Card.Body className="p-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors }) => (
                        <Form>
                            <Field
                                type="text"
                                name="username"
                                label="Имя пользователя"
                                autocomplete="username"
                                component={FormInput}
                            />

                            <Field
                                type="password"
                                name="password"
                                label="Пароль"
                                autocomplete="new-password"
                                component={FormInput}
                            />

                            <Field
                                type="password"
                                name="confirmPassword"
                                label="Подтвердите пароль"
                                autocomplete="new-password"
                                component={FormInput}
                            />

                            <Button
                                type="submit"
                                variant="outline-primary"
                                disabled={errors.username || errors.password || errors.confirmPassword}
                            >
                                Зарегестрироваться
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
};

export default SignupForm;
