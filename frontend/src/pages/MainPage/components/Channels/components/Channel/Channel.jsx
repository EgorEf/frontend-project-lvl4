import Button from 'react-bootstrap/Button';

const ChannelButton = ({ name, variant, onSelect }) => (
  <Button
    variant={variant}
    className="text-start w-100"
    onClick={onSelect}
  >
    {`# ${name}`}
  </Button>
);

export default ChannelButton;
