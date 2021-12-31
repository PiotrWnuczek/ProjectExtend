import React from 'react';
import { useApp } from 'App';
import { Box } from '@mui/material';
import SideBar from 'organisms/SideBar';

const MainLayout = ({ children }) => {
  const width = { xs: 180, sm: 140, md: 180 };
  const [sidebar, setSidebar] = useApp();

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar
        sx={{
          display: { xs: 'block', sm: 'none' }, width, '& .MuiDrawer-paper':
            { bgcolor: 'secondary.dark', justifyContent: 'space-between', width },
        }}
        variant='temporary'
        open={sidebar}
        onClose={() => setSidebar(!sidebar)}
      />
      <SideBar
        sx={{
          display: { xs: 'none', sm: 'block' }, width, '& .MuiDrawer-paper':
            { bgcolor: 'secondary.dark', justifyContent: 'space-between', width },
        }}
        variant='permanent'
      />
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  )
};

export default MainLayout;
