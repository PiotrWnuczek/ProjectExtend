import React from 'react';
import { Box } from '@mui/material';
import Masonry from 'react-masonry-css';
import ChatCard from 'molecules/ChatCard';

const ProfileChats = () => {
  const breakpoints = { default: 2, 700: 1 };

  return (
    <Box sx={{ p: 2 }}>
      <Masonry
        breakpointCols={breakpoints}
        className='masonryGrid'
        columnClassName='masonryGridColumn'
      >
        <ChatCard />
        <ChatCard />
      </Masonry>
    </Box>
  )
};

export default ProfileChats;
