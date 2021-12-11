import React from 'react';
import { styled } from '@mui/system';

const StyledWrapper = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FrontLayout = ({ children }) => (
  <StyledWrapper>
    <div>{children}</div>
  </StyledWrapper>
);

export default FrontLayout;
