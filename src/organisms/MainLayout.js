import React from 'react';
import { styled } from '@mui/system';
import SideBar from 'molecules/SideBar';

const sideWidth = 150;

const StyledWrapper = styled('div')({
  display: 'flex',
});

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const MainLayout = ({ children }) => (
  <StyledWrapper>
    <SideBar sideWidth={sideWidth} />
    <Offset />
    {children}
  </StyledWrapper>
);

export default MainLayout;
