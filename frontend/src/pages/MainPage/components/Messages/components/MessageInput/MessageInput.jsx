import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import useSocketConnection from 'hooks/useSocketConnection';

import { getUsername } from 'utils';

import { initialValues, validationSchema } from './constants';

const MessageInput = ({ channelId }) => {
  const { t } = useTranslation();

  const { sendMessage } = useSocketConnection();

  const onSubmit = async (values, actions) => {
    await sendMessage({
      body: values.messageText,
      channelId,
      username: getUsername(),
    });

    actions.setValues(initialValues);
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
                autoComplete="off"
                value={props.values.messageText}
                placeholder={t('Form.Fields.Message')}
                aria-label="Новое сообщение"
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
