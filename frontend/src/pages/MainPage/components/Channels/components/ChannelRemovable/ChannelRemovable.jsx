import { useTranslation } from 'react-i18next';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import Channel from '../Channel';

const ChannelRemovable = ({
  variant,
  name,
  onSelect,
  onRemove,
  onRename,
}) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      className="w-100"
      as={ButtonGroup}
    >
      <Channel
        name={name}
        variant={variant}
        onSelect={onSelect}
      />

      <Dropdown.Toggle
        split
        variant={variant}
        id="dropdown-split-basic"
      >
        <span className="visually-hidden">
          {t('TextHidden.ChannelManagement')}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onRemove}>
          {t('Buttons.Delete')}
        </Dropdown.Item>

        <Dropdown.Item onClick={onRename}>
          {t('Buttons.Rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelRemovable;
