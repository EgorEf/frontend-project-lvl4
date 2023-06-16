import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ModalContent = ({
  title,
  name,
  label,
  placeholder,
  cancelBtnText,
  submitBtnText,
  onClose,
}) => {
  const inputRef = useRef(null);

  const {
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    values,
    touched,
    errors,
  } = useFormikContext();

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label className="visually-hidden" htmlFor={name}>
            {label}
          </Form.Label>

          <Form.Control
            ref={inputRef}
            id={name}
            name={name}
            placeholder={placeholder}
            value={values[name]}
            onChange={handleChange}
            isInvalid={!isValid}
          />

          {!isValid && touched[name] && (
            <Form.Text bsPrefix="text-danger">
              {errors[name]}
            </Form.Text>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          disabled={isSubmitting}
          onClick={onClose}
        >
          {cancelBtnText}
        </Button>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {submitBtnText}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalContent;
