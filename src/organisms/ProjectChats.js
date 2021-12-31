import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import Masonry from 'react-masonry-css';

const ProjectChats = () => {
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

  return (
    <Box sx={{ p: 2 }}>
      <Masonry
        breakpointCols={breakpoints}
        className='masonryGrid'
        columnClassName='masonryGridColumn'
      >
        <Card
          sx={{ bgcolor: 'secondary.light' }}
          variant='outlined'
        >
          <CardContent>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
            </Typography>
          </CardContent>
        </Card>
      </Masonry>
    </Box>
  )
};

export default ProjectChats;
