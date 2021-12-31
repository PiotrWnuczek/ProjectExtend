import React, { useState } from 'react';
import { useApp } from 'App';
import { Box, Typography, Divider } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
import { Menu } from '@mui/icons-material';
import MainLayout from 'organisms/MainLayout';
import ProjectAbout from 'organisms/ProjectAbout';
import ProjectTasks from 'organisms/ProjectTasks';
import ProjectChats from 'organisms/ProjectChats';

const ProjectView = () => {
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
          Project
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
            label='Tasks'
          />
          <Tab
            sx={{ py: { xs: 2.4, sm: 2.9 } }}
            label='Chats'
          />
        </Tabs>
      </Box>
      <Divider />
      {tabs === 0 && <ProjectAbout />}
      {tabs === 1 && <ProjectTasks />}
      {tabs === 2 && <ProjectChats />}
    </MainLayout>
  )
};

export default ProjectView;
