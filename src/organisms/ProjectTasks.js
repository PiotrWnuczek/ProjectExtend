import React from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import TaskCard from 'molecules/TaskCard';

const ProjectTasks = ({ tasks }) => (
  <Box sx={{ p: 2 }}>
    <Grid container>
      <Grid item xs>
        <Typography variant='h6'>
          Todo
        </Typography>
        {tasks && tasks.map(task =>
          task.type === 'todo' && <TaskCard task={task} />
        )}
      </Grid>
      <Divider
        sx={{ mx: 2, height: '86vh' }}
        orientation='vertical'
        flexItem
      />
      <Grid item xs>
        <Typography variant='h6'>
          Done
        </Typography>
        {tasks && tasks.map(task =>
          task.type === 'done' && <TaskCard task={task} />
        )}
      </Grid>
    </Grid>
  </Box>
);

export default ProjectTasks;
