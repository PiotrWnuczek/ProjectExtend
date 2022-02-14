import React, { useState } from 'react';
import { Card, CardContent, CardActions } from '@mui/material';
import { IconButton, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const TaskCard = ({ task }) => {
  const [expand, setExpand] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', my: 2 }}
      variant='outlined'
      key={task.id}
    >
      <CardContent>
        {task.content} <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </CardContent>
      <CardActions>
        <IconButton onClick={() => setExpand(!expand)}>
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expand} timeout='auto' unmountOnExit>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardContent>
      </Collapse>
    </Card>
  )
};

export default TaskCard;
