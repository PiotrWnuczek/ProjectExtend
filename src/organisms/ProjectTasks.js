import React from 'react';
import { Box } from '@mui/material';
import Masonry from 'react-masonry-css';
import TaskCard from 'molecules/TaskCard';

const ProjectTasks = () => {
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

  return (
    <Box sx={{ p: 2 }}>
      <Masonry
        breakpointCols={breakpoints}
        className='masonryGrid'
        columnClassName='masonryGridColumn'
      >
        <TaskCard />
        <TaskCard />
      </Masonry>
    </Box>
  )
};

export default ProjectTasks;
