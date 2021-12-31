import React, { useState } from 'react';
import { useApp } from 'App';
import { Box, Typography, Divider } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
import { Menu } from '@mui/icons-material';
import MainLayout from 'pages/MainLayout';
import ProfileContent from 'organisms/ProfileContent';
import ProfileSkills from 'organisms/ProfileSkills';
import ProfileChats from 'organisms/ProfileChats';

const ProfileView = () => {
  const [sidebar, setSidebar] = useApp();
  const [tabs, setTabs] = useState(0);

  return (
    <MainLayout>
      <Box sx={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: { xs: 'space-around', sm: 'left' },
      }}>
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, m: { xs: 1, sm: 2 } }}
          onClick={() => setSidebar(!sidebar)}
        >
          <Menu />
        </IconButton>
        <Typography
          sx={{ m: { xs: 1, sm: 2 } }}
          variant='h5'
        >
          Profile
        </Typography>
        <Tabs
          value={tabs}
          onChange={(e, v) => setTabs(v)}
        >
          <Tab
            sx={{ py: { xs: 2.4, sm: 2.9 } }}
            label='About'
          />
          <Tab
            sx={{ py: { xs: 2.4, sm: 2.9 } }}
            label='Chats'
          />
        </Tabs>
      </Box>
      <Divider />
      {tabs === 0 && <Box sx={{ p: 2 }}>
        <ProfileContent />
        <ProfileSkills />
      </Box>}
      {tabs === 1 && <ProfileChats />}
    </MainLayout>
  )
};

export default ProfileView;
