import React from 'react';
import { styled } from '@mui/system';
import SideBar from 'molecules/SideBar';

const StyledWrapper = styled('div')({
  display: 'flex',
  padding: '1rem',
});

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const MainLayout = ({ children }) => (
  <StyledWrapper>
    <SideBar />
    <Offset />
    {children}
  </StyledWrapper>
);

export default MainLayout;
