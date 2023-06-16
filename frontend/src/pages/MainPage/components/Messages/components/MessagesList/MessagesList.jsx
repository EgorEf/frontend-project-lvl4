import { useRef, useEffect } from 'react';
import filter from 'leo-profanity';

const MessagesList = ({ list }) => {
  const ref = useRef();

  useEffect(() => {
    const messageContainer = ref.current;

    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  });

  return (
    <div
      ref={ref}
      className="overflow-auto"
    >
      {list.map((item) => (
        <div
          key={item.id}
          className="mb-2 text-break"
        >
          <b>
            {item.username}
          </b>

          {`: ${filter.clean(item.body)}`}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
