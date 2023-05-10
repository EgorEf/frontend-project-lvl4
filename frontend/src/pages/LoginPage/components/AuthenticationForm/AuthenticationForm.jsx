import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Formik } from 'formik';
import FormGroup from './components/FormGroup';

import { initialValues, validationSchema } from './constants';

import styles from './AuthenticationForm.module.css';

const AuthenticationForm = () => (
    <Container>
        <h1 className={styles.title}>
            Вход
        </h1>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
        >
            {(formikProps) => (
                <Form
                    className={styles.form}
                    onSubmit={formikProps.handleSubmit}
                >
                    <FormGroup
                        fieldName="name"
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

export default AuthenticationForm;
