import React from 'react';
import { Card, Box, IconButton, Typography } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const CanvaCard = () => (
  <Card
    sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 2 }}
    variant='outlined'
  >
    <Box sx={{
      p: 2, display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
    }}>
      <IconButton size='small'>
        <NavigateBefore />
      </IconButton>
      <Typography variant='button'>
        Todo
      </Typography>
      <Typography variant='button'>
        Sprint Canva
      </Typography>
      <Typography variant='button'>
        Done
      </Typography>
      <IconButton size='small'>
        <NavigateNext />
      </IconButton>
    </Box>
  </Card>
);

export default CanvaCard;
