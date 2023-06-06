import NavItem from 'react-bootstrap/NavItem';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const Channel = ({
    active,
    name,
    removable,
    onSelect,
    onRemove,
    onRename
}) => {
    const currentVariant = active ? 'secondary' : '';

    return (
        <NavItem as="li">
            <Dropdown
                className="w-100"
                as={ButtonGroup}
            >
                <Button
                    variant={currentVariant}
                    className="text-start w-100"
                    onClick={onSelect}
                >
                    {`# ${name}`}
                </Button>

                {removable && (
                    <>
                        <Dropdown.Toggle
                            split
                            variant={currentVariant}
                            id="dropdown-split-basic"
                        />

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={onRemove}>
                                Удалить
                            </Dropdown.Item>

                            <Dropdown.Item onClick={onRename}>
                                Переименовать
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </>
                )}
            </Dropdown>
        </NavItem>
    );
};

export default Channel;
