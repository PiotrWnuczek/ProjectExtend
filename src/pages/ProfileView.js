import React, { useState } from 'react';
import MainLayout from 'organisms/MainLayout';
import { Typography, Button } from '@mui/material';

const ProfileView = () => {
  const [active, setActive] = useState('about');

  return (
    <MainLayout>
      <Typography
        variant='h5'
        sx={{ display: 'inline' }}
        mx={2}
      >
        ProfileView
      </Typography>
      <Button
        size='small'
        variant={active === 'about' ? 'contained' : 'text'}
        onClick={() => setActive('about')}
      >
        About
      </Button>
      <Button
        size='small'
        variant={active === 'messages' ? 'contained' : 'text'}
        onClick={() => setActive('messages')}
      >
        Messages
      </Button>
    </MainLayout>
  )
};

export default ProfileView;
