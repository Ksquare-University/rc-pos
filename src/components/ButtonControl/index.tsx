import { Button } from '@mui/material';
import React from 'react';

interface Props {
  label: string;
  Icon?: React.ElementType;
  handleClick?: () => void;
  nameClass?: string;
  disabled?: boolean;
}

const ButtonControl = (props: Props) => {
  const { label, Icon, handleClick, nameClass, disabled = false } = props;

  return (
    <Button
      disabled={disabled}
      variant='contained'
      className={nameClass}
      onClick={handleClick}
    >
      {Icon ? <Icon sx={{ paddingRight: '5px' }} /> : ''} {label}
    </Button>
  );
};

export default ButtonControl;
