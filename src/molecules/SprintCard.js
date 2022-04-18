import React from 'react';
import { Card, Box, Button, Typography } from '@mui/material';

const SprintCard = ({ previous, next }) => (
  <Card
    sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 1 }}
    variant='outlined'
  >
    <Box sx={{ p: 2, display: 'flex' }}>
      <Typography>
        Actually sprint canva
        <Button
          sx={{ ml: 1 }}
          onClick={() => previous()}
          size='small'
        >
          Previous Sprint
        </Button>
        <Button
          sx={{ ml: 1 }}
          onClick={() => next()}
          size='small'
        >
          Next Sprint
        </Button>
      </Typography>
    </Box>
  </Card>
);

export default SprintCard;
