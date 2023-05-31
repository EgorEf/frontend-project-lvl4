import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import Channel from './components/Channel/Channel';

import {
    selectCurrentChannelId,
    selectAll,
    getCurrentChannelId
} from 'slices/channelsSlice';

const Channels = () => {
    const dispatch = useDispatch();

    const channels = useSelector(selectAll);
    const currentChannelId = useSelector(getCurrentChannelId);

    const onSelectChannel = (id) => () => dispatch(selectCurrentChannelId(id));

    return (
        <>
            <Container className="d-flex justify-content-between py-4 mb-1">
                <h6 className="m-0">
                    Каналы
                </h6>

                <Button
                    type="button"
                    variant=""
                    className="p-0 text-primary btn-group-vertical"
                >
                    <Image
                        src="icons/plus-square.svg"
                        fluid
                    />
                </Button>
            </Container>

            <Nav
                className="flex-column"
                as="ul"
            >
                {channels.map(({
                    id,
                    name,
                    removable
                }) => (
                    <Channel
                        key={id}
                        active={id === currentChannelId}
                        name={name}
                        removable={removable}
                        onSelect={onSelectChannel(id)}
                    />
                ))}
            </Nav>
        </>
    );
};

export default Channels;
