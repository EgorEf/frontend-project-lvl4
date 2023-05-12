import { Formik, Form } from 'formik';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import useSocketConnection from 'hooks/useSocketConnection';

import { getUsername } from 'utils';

import { initialValues, validationSchema } from './constants';

const MessageInput = ({ channelId }) => {
    const { sendMessage } = useSocketConnection();

    const onSubmit = async (values) => {
        sendMessage({
            body: values.messageText,
            channelId,
            username: getUsername()
        });
    };

    return (
        <div className="mt-auto pt-3">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnMount
                onSubmit={onSubmit}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <InputGroup>
                            <FormControl
                                type="messageText"
                                name="messageText"
                                placeholder="Введите сообщение"
                                onChange={props.handleChange}
                            />

                            <Button
                                type="submit"
                                variant={props.isValid ? 'primary' : 'secondary'}
                                disabled={!props.isValid}
                                className="btn-group-vertical"
                            >
                                <Image src="icons/arrow-right.svg" />
                            </Button>
                        </InputGroup>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MessageInput;
