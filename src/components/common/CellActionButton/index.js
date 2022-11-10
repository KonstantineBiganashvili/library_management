import { Button } from '@mui/material';
import React from 'react';
import './CellActionButton.scss';

const CellActionButton = (props) => {
  const { onClick, variant, color, children, style } = props;

  return (
    <Button
      onClick={onClick}
      variant={variant || 'contained'}
      color={color}
      className={`${style} btn`}
    >
      {children}
    </Button>
  );
};

export default CellActionButton;
