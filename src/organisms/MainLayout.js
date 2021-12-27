import React, { useState } from 'react';
import { Box, AppBar, Toolbar } from '@mui/material';
import { IconButton, Divider } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { styled } from '@mui/system';
import SideBar from 'molecules/SideBar';
import Logo from 'assets/logo.png';

const StyledLogo = styled('img')({
  maxHeight: 30,
});

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const width = { xs: 180, sm: 140, md: 180 };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        sx={{ display: { xs: 'block', sm: 'none' } }}
        color='transparent'
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>
          <StyledLogo src={Logo} alt='Logo' />
        </Toolbar>
        <Divider />
      </AppBar>
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
        <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
        {children}
      </Box>
    </Box>
  )
};

export default MainLayout;
