import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { Box, Divider, Button } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
import { Menu, Input, Chat } from '@mui/icons-material';
import MainLayout from 'pages/MainLayout';
import ProfileContent from 'organisms/ProfileContent';
import ProfileSkills from 'organisms/ProfileSkills';
import ProfileChats from 'organisms/ProfileChats';

const ProfileView = () => {
  const [sidebar, setSidebar] = useApp();
  const [tabs, setTabs] = useState(0);

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, my: 1.5, ml: 1 }}
          onClick={() => setSidebar(!sidebar)}
        >
          <Menu />
        </IconButton>
        {tabs === 0 && <Button
          sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
          variant='outlined'
        >
          Make Contact
        </Button>}
        {tabs === 1 && <Button
          sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
          variant='outlined'
        >
          Create Chat
        </Button>}
        <Tabs
          value={tabs}
          onChange={(e, v) => setTabs(v)}
        >
          <Tab
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Input />}
          />
          <Tab
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Chat />}
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
