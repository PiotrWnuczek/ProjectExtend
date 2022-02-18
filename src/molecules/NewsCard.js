import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { Notifications, ExpandMore } from '@mui/icons-material';

const NewsCard = () => {
  const [expand, setExpand] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light' }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography>
          Lorem ipsum dolor sit amet.
        </Typography>}
        avatar={<Avatar>
          <Notifications />
        </Avatar>}
        action={<>
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardContent>
      </Collapse>
    </Card>
  )
};

export default NewsCard;
