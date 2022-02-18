import React from 'react';
import { Box } from '@mui/material';
import NewsCard from 'molecules/NewsCard';

const ProfileNews = () => {

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ pb: 2 }}>
        <NewsCard />
      </Box>
      <Box sx={{ pb: 2 }}>
        <NewsCard />
      </Box>
    </Box>
  )
};

export default ProfileNews;
