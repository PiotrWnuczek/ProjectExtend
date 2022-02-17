import React, { useState } from 'react';
import { Box, Collapse, Button } from '@mui/material';
import { Settings } from '@mui/icons-material';

const OptionsMenu = () => {
  const [options, setOptions] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOptions(!options)}
        endIcon={<Settings />}
        variant='outlined'
        size='small'
      >
        Options
      </Button>
      <Collapse in={options} timeout='auto'>
        <Box sx={{ py: 1 }}>
          {true && <Button
            onClick={() => console.log('leave')}
            variant='outlined'
            size='small'
            color='error'
          >
            Leave Project
          </Button>}
          {false && <Button
            onClick={() => console.log('delete')}
            variant='outlined'
            size='small'
            color='error'
          >
            Delete Project
          </Button>}
        </Box>
      </Collapse>
    </div>
  )
};

export default OptionsMenu;
