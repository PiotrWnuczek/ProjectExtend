import React from 'react';
import { Card, Box, Button, Typography } from '@mui/material';

const CanvaCard = () => (
  <Card
    sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 1 }}
    variant='outlined'
  >
    <Box sx={{ p: 2, display: 'flex' }}>
      <Typography>
        Actually sprint canva
        <Button
          sx={{ ml: 1 }}
          size='small'
        >
          Previous Sprint
        </Button>
        <Button
          sx={{ ml: 1 }}
          size='small'
        >
          Next Sprint
        </Button>
      </Typography>
    </Box>
  </Card>
);

export default CanvaCard;
