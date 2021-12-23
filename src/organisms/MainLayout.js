import React from 'react';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { styled } from '@mui/system';
import SideBar from 'molecules/SideBar';
import Logo from 'assets/logo.png';

const StyledLogo = styled('img')({
  maxHeight: '2rem',
});

const MainLayout = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <AppBar
      sx={{ display: { xs: 'block', sm: 'none' }, background: 'inherit' }}
      elevation={0}
    >
      <Toolbar>
        <IconButton>
          <Menu />
        </IconButton>
        <StyledLogo src={Logo} alt='Logo' />
      </Toolbar>
    </AppBar>
    <SideBar
      anchor='left'
      variant='temporary'
      sx={{ display: { xs: 'block', sm: 'none' } }}
    />
    <SideBar
      anchor='left'
      variant='permanent'
      sx={{ display: { xs: 'none', sm: 'block' } }}
    />
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
      {children}
    </Box>
  </Box>
);

export default MainLayout;
