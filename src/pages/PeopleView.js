import React from 'react';
import MainLayout from 'organisms/MainLayout';
import { Box, Card, Typography, TextField, Divider } from '@mui/material';
import { Masonry } from '@mui/lab';

const PeopleView = () => (
  <MainLayout>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        variant='h5'
        sx={{ m: 1 }}
      >
        PeopleView
      </Typography>
      <TextField
        size='small'
        label='search'
      />
    </Box>
    <Divider sx={{ mb: 1 }} />
    <Masonry columns={3} spacing={1}>
      <Card variant='outlined'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus. Praesent aliquet felis odio, eu feugiat risus accumsan eu.
      </Card>
      <Card variant='outlined'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
      </Card>
      <Card variant='outlined'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Integer laoreet pharetra porttitor. Ut et facilisis lorem. Proin vulputate in nunc vitae ullamcorper. Donec finibus iaculis vehicula.
      </Card>
      <Card variant='outlined'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
      </Card>
      <Card variant='outlined'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
      </Card>
    </Masonry>
  </MainLayout>
);

export default PeopleView;
