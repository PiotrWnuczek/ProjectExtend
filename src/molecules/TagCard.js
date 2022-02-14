import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const TagCard = ({ tag }) => (
  <Card
    sx={{ bgcolor: 'secondary.light' }}
    variant='outlined'
    key={tag}
  >
    <CardContent>
      <Typography>
        {tag}
        Lorem ipsum
      </Typography>
    </CardContent>
  </Card>
);

export default TagCard;
