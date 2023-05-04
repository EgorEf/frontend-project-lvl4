import Form from 'react-bootstrap/Form';
import { ErrorMessage } from 'formik';

import styles from './FormGroup.module.css';

const FormGroup = ({
    fieldName,
    label,
    placeholder,
    onChange
}) => (
    <Form.Group className="mb-4">
        <Form.Label>
            {label}
        </Form.Label>

        <Form.Control
            type={fieldName}
            name={fieldName}
            placeholder={placeholder}
            onChange={onChange}
        />

        <ErrorMessage name={fieldName}>
            {(message) => (
                <Form.Text bsPrefix={styles.errorText}>
                    {message}
                </Form.Text>
            )}
        </ErrorMessage>
    </Form.Group>
);

export default FormGroup;
