import React from 'react';
import { Container, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledWrapper = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const FrontLayout = ({ children }) => (
  <StyledWrapper>
    <Container maxWidth='md'>
      <Card
        variant='outlined'
        sx={{ m: 2, px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}
      >
        {children}
      </Card>
      <Typography mt={2}>
        Copyright © projectextend.com
      </Typography>
    </Container>
  </StyledWrapper>
);

export default FrontLayout;
