import React from 'react';
import { Typography, Divider } from '@mui/material';
import { Card, CardContent, TextField } from '@mui/material';
import { Masonry } from '@mui/lab';
import MainLayout from 'organisms/MainLayout';

const PeopleView = () => (
  <MainLayout>
    <Typography
      variant='h5'
      sx={{ display: 'inline-flex', m: 2 }}
    >
      People
    </Typography>
    <TextField
      size='small'
      label='search'
      sx={{ display: 'inline-flex', m: 1.5 }}
    />
    <Divider />
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3 }}
      spacing={2}
      sx={{ p: 1, m: 0 }}
    >
      <Card variant='outlined'>
        <CardContent>
          <Typography>
            1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus. Praesent aliquet felis odio, eu feugiat risus accumsan eu. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
          </Typography>
        </CardContent>
      </Card>
      <Card variant='outlined'>
        <CardContent>
          <Typography>
            2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
          </Typography>
        </CardContent>
      </Card>
      <Card variant='outlined'>
        <CardContent>
          <Typography>
            3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Integer laoreet pharetra porttitor. Ut et facilisis lorem. Proin vulputate in nunc vitae ullamcorper. Donec finibus iaculis vehicula.
          </Typography>
        </CardContent>
      </Card>
    </Masonry>
  </MainLayout>
);

export default PeopleView;
