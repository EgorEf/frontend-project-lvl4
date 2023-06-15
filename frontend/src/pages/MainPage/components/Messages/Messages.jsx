import { useSelector } from 'react-redux';
import cn from 'classnames';

import MessageInput from './components/MessageInput';
import MessagesList from './components/MessagesList';

import { getCurrentChannelId, selectById } from 'slices/channelsSlice';
import { getMessagesByChannelId } from 'slices/messagesSlice';

import { getTextByNumOfEntities } from 'utils';

import styles from './Messages.module.css';

const Messages = () => {
    const currentChannelId = useSelector(getCurrentChannelId);
    const currentChannel = useSelector((state) => selectById(state, currentChannelId));
    const messagesList = useSelector(getMessagesByChannelId(currentChannelId));

    const channelName = currentChannel?.name || '';

    return (
        <div className="d-flex flex-column h-100 w-100">
            <div className="py-3 small">
                <p className="mb-0">
                    <strong>
                        {`# ${channelName}`}
                    </strong>
                </p>

                <span className="text-muted">
                    {getTextByNumOfEntities(messagesList.length, ['сообщение', 'сообщения', 'сообщений'])}
                </span>
            </div>

            <div className={cn(styles.messagesContainer, 'd-flex flex-column py-3 px-4 bg-white rounded')}>
                <MessagesList list={messagesList} />

                <MessageInput channelId={currentChannelId} />
            </div>
        </div>
    );
};

export default Messages;
