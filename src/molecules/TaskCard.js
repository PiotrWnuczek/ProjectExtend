import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const TaskCard = ({ task }) => (
  <Card
    sx={{ bgcolor: 'secondary.light' }}
    variant='outlined'
  >
    <CardContent>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus. {task.content}
      </Typography>
    </CardContent>
  </Card>
);

export default TaskCard;
