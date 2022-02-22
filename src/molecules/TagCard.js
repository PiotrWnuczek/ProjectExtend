import React from 'react';
import { Card, CardHeader, IconButton, Typography } from '@mui/material';
import { Delete, Tag } from '@mui/icons-material';

const TagCard = ({ tag }) => (
  <Card
    sx={{ bgcolor: 'secondary.light' }}
    variant='outlined'
    key={tag}
  >
    <CardHeader
      title={
        <Typography>
          {tag}
        </Typography>
      }
      avatar={
        <Tag color='info' size='small' />
      }
      action={
        <IconButton size='small'>
          <Delete sx={{ fontSize: 18, mt: 0.3 }} />
        </IconButton>
      }
    />
  </Card>
);

export default TagCard;
