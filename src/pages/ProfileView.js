import React, { useState } from 'react';
import MainLayout from 'organisms/MainLayout';
import { Typography, Tabs, Tab } from '@mui/material';

const ProfileView = () => {
  const [value, setValue] = useState(0);

  return (
    <MainLayout>
      <Typography variant='h4' mr={2}>
        ProfileView
      </Typography>
      <div>
        <Tabs value={value} onChange={(e, v) => setValue(v)}>
          <Tab label='About' />
          <Tab label='Messages' />
        </Tabs>
      </div>
    </MainLayout>
  )
};

export default ProfileView;
