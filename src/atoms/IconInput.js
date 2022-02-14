import React from 'react';
import { OutlinedInput, IconButton } from '@mui/material';

const IconInput = ({ name, label, icon, ...props }) => (
  <OutlinedInput
    {...props}
    placeholder={label}
    name={name}
    endAdornment={<IconButton type='submit'>
      {icon}
    </IconButton>}
    fullWidth
  />
);

export default IconInput;
