import React, { useState } from 'react';
import MainLayout from 'organisms/MainLayout';
import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';

const ProfileView = () => {
  const [active, setActive] = useState(0);

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant='h5'
          sx={{ m: 1 }}
        >
          ProfileView
        </Typography>
        <Tabs value={active} onChange={(e, v) => setActive(v)}>
          <Tab label='About' />
          <Tab label='Messages' />
        </Tabs>
      </Box>
      <Divider />
      <p>{active}</p>
    </MainLayout>
  )
};

export default ProfileView;
