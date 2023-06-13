import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FormInput from 'components/FormInput';

import API from 'api';

import useAuth from 'hooks/useAuth';

import ROUTES from 'routes';
import { ERRORS_TYPES } from 'constants';
import { initialValues, getValidationSchema, validateConfirmPassword } from './constants';

const SignupForm = () => {
    const { t } = useTranslation();
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const onSubmit = useCallback(async ({ username, password }, actions) => {
        try {
            const userData = await API.signup(username, password);
            logIn(userData);
            navigate(ROUTES.main, { replace: true });
        } catch (e) {
            if (e.response?.status === ERRORS_TYPES.Conflict) {
                actions.setErrors({
                    username: ' ',
                    password: ' ',
                    confirmPassword: t('Form.Errors.UserAlreadyExists')
                });
            }

            if (e.code === 'ERR_NETWORK') {
                toast.error(t('Toasts.Error.Connection'));
            }
        }
    }, [logIn, navigate, t]);

    return (
        <Card>
            <Card.Header>
                <Card.Title className="p-3 text-center" as="h1">
                    {t('Registration')}
                </Card.Title>
            </Card.Header>

            <Card.Body className="p-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={getValidationSchema(t)}
                    onSubmit={onSubmit}
                >
                    {({ errors, values }) => (
                        <Form>
                            <Field
                                type="text"
                                name="username"
                                label={t('Form.Fields.Username')}
                                autocomplete="username"
                                component={FormInput}
                            />

                            <Field
                                type="password"
                                name="password"
                                label={t('Form.Fields.Password')}
                                autocomplete="new-password"
                                component={FormInput}
                            />

                            <Field
                                type="password"
                                name="confirmPassword"
                                label={t('Form.Fields.ConfirmPassword')}
                                autocomplete="new-password"
                                validate={validateConfirmPassword(values.password)}
                                component={FormInput}
                            />

                            <Button
                                type="submit"
                                variant="outline-primary"
                                disabled={errors.username || errors.password || errors.confirmPassword}
                            >
                                {t('Buttons.Signup')}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
};

export default SignupForm;
