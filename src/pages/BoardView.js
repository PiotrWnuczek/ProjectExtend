import React from 'react';
import { useApp } from 'App';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { IconButton, Divider, TextField } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'organisms/MainLayout';

const BoardView = () => {
  const [sidebar, setSidebar] = useApp();
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

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
          Board
        </Typography>
        <TextField
          sx={{ m: { xs: 0.5, sm: 1.5 } }}
          label='search'
          size='small'
        />
      </Box>
      <Divider />
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus. Praesent aliquet felis odio, eu feugiat risus accumsan eu. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{ bgcolor: 'secondary.light' }}
            variant='outlined'
          >
            <CardContent>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Praesent aliquet felis odio, eu feugiat risus accumsan eu. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{ bgcolor: 'secondary.light' }}
            variant='outlined'
          >
            <CardContent>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus. Praesent aliquet felis odio, eu feugiat risus accumsan eu.
              </Typography>
            </CardContent>
          </Card>
        </Masonry>
      </Box>
    </MainLayout>
  )
};

export default BoardView;
