import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ name, label, ...props }) => (
  <TextField
    {...props}
    placeholder={label}
    label={label}
    name={name}
    sx={{ mb: 2 }}
    variant='outlined'
    fullWidth
  />
);

export default TextInput;
