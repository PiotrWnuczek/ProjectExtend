import React from 'react';
import { Button } from '@mui/material';

const OptionsMenu = () => (
  <div>
    <Button
      sx={{ mr: 2 }}
      variant='outlined'
      size='small'
    >
      Leave Project
    </Button>
    <Button
      variant='outlined'
      size='small'
    >
      Delete Project
    </Button>
  </div>
);

export default OptionsMenu;
