import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const ActionsSection = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 5, md: 10 }, textAlign: 'center' }}>
      <Typography
        sx={{
          mb: 3, fontSize: { xs: 18, md: 28 }, fontWeight: 600,
          letterSpacing: 2,
        }}
        variant='h2'
      >
        Sign In or Sign Up
      </Typography>
      <Button
        sx={{ m: 1, width: '70%' }}
        onClick={() => navigate('/signin')}
        variant='contained'
      >
        SignIn
      </Button>
      <Button
        sx={{ m: 1, width: '70%' }}
        onClick={() => navigate('/signup')}
        variant='outlined'
      >
        SignUp
      </Button>
    </Box>
  )
};

export default ActionsSection;
