import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const OptionsMenu = () => (
  <div>
    <Button>
      Danger Zone
    </Button>
    <Menu>
      <MenuItem>
        Leave Project
      </MenuItem>
      <MenuItem>
        Delete Project
      </MenuItem>
    </Menu>
  </div>
);

export default OptionsMenu;
