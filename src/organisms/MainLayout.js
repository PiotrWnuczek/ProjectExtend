import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import SideBar from 'molecules/SideBar';

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const width = { xs: 180, sm: 140, md: 180 };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar
        sx={{
          display: { xs: 'block', sm: 'none' }, width,
          '& .MuiDrawer-paper': { justifyContent: 'space-between', width },
        }}
        variant='temporary'
        open={open}
        onClose={() => setOpen(!open)}
      />
      <SideBar
        sx={{
          display: { xs: 'none', sm: 'block' }, width,
          '& .MuiDrawer-paper': { justifyContent: 'space-between', width },
        }}
        variant='permanent'
      />
      <Box sx={{ flexGrow: 1 }}>
        <IconButton
          sx={{ display: { xs: 'inline-flex', sm: 'none' }, mb: 1, ml: 2 }}
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </IconButton>
        {children}
      </Box>
    </Box>
  )
};

export default MainLayout;
