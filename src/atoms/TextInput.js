import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ name, add, ...props }) => (
  <TextField {...props}
    required={add ? false : true}
    sx={{ mb: add ? 0 : 2 }}
    placeholder={name}
    label={name}
    name={name}
    variant='outlined'
    color='secondary'
    fullWidth
  />
);

export default TextInput;
