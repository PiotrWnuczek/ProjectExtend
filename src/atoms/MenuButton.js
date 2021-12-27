import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

const MenuButton = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <IconButton onClick={() => setSidebar(!sidebar)}>
      <Menu />
    </IconButton>
  )
};

export default MenuButton;
