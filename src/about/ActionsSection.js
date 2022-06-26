import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const ActionsSection = () => {
  const navigate = useNavigate();

  return (
    <Box p={5} sx={{ textAlign: 'center' }}>
      <Button
        sx={{ mx: 1 }}
        onClick={() => navigate('/signin')}
        variant='outlined'
      >
        SignIn
      </Button>
      <Button
        sx={{ mx: 1 }}
        onClick={() => navigate('/signup')}
        variant='outlined'
      >
        SignUp
      </Button>
    </Box>
  )
};

export default ActionsSection;
