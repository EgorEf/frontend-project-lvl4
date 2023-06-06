import Footer from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';

const ModalFooter = ({
    submitBtnText,
    disabled,
    onClose,
    onSubmit
}) => (
    <Footer>
        <Button
            variant="secondary"
            disabled={disabled}
            onClick={onClose}
        >
            Отменить
        </Button>

        <Button
            variant="primary"
            disabled={disabled}
            onClick={onSubmit}
        >
            {submitBtnText}
        </Button>
    </Footer>
);

export default ModalFooter;
