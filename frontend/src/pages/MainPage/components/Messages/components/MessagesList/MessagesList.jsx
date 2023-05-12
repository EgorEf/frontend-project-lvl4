const MessagesList = ({ list }) => (
    <div className="overflow-auto">
        {list.map((item) => (
            <div
                key={item.id}
                className="mb-2 text-break"
            >
                <b>
                    {item.username}
                </b>
                {`: ${item.body}`}
            </div>
        ))}
    </div>
);

export default MessagesList;
