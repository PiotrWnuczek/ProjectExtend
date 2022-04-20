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
    <Container maxWidth='sm'>
      <Card
        sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 3, mb: 2 }}
        variant='outlined'
      >
        {children}
      </Card>
      <Typography>
        Copyright © projectextend.com
      </Typography>
    </Container>
  </StyledWrapper>
);

export default FrontLayout;
