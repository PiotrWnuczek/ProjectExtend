import React from 'react';
import { useApp } from 'App';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { IconButton, Divider, TextField } from '@mui/material';
import { Masonry } from '@mui/lab';
import { Menu } from '@mui/icons-material';
import MainLayout from 'organisms/MainLayout';

const PeopleView = () => {
  const [sidebar, setSidebar] = useApp();

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
          People
        </Typography>
        <TextField
          sx={{ m: { xs: 0.5, sm: 1.5 } }}
          label='search'
          size='small'
        />
      </Box>
      <Divider />
      <Masonry
        sx={{ p: 1, m: 0 }}
        columns={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
      >
        <Card variant='outlined'>
          <CardContent>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus. Praesent aliquet felis odio, eu feugiat risus accumsan eu. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
            </Typography>
          </CardContent>
        </Card>
      </Masonry>
    </MainLayout>
  )
};

export default PeopleView;
