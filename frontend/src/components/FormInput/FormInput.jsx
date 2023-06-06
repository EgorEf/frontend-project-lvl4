import { ErrorMessage } from 'formik';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const FormInput = ({
    field,
    form,
    autocomplete,
    type,
    label
}) => {
    const {
        name,
        value,
        onChange,
        onBlur
    } = field;
    const { touched, errors } = form;

    return (
        <Form.Group className="mb-4">
            <FloatingLabel label={label}>
                <Form.Control
                    type={type}
                    name={name}
                    value={value}
                    placeholder={label}
                    autoComplete={autocomplete}
                    isInvalid={!!errors[name] && touched[name]}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </FloatingLabel>

            <ErrorMessage name={name}>
                {(message) => (
                    <Form.Text className="text-danger">
                        {message}
                    </Form.Text>
                )}
            </ErrorMessage>
        </Form.Group>
    );
};

export default FormInput;
