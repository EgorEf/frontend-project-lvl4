import Header from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';

const ModalHeader = ({ title }) => (
    <Header closeButton>
        <ModalTitle>
            {title}
        </ModalTitle>
    </Header>
);

export default ModalHeader;
