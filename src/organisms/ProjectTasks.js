import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import TaskCard from 'molecules/TaskCard';

const ProjectTasks = ({ tasks }) => (
  <Box sx={{ p: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ bgcolor: 'inherit', p: 2 }}
          variant='outlined'
        >
          <Typography
            sx={{ mb: 3.5, mt: 0.5 }}
            variant='h6'
          >
            Tasks
          </Typography>
          <Grid container spacing={2}>
            {tasks && tasks.map(task =>
              <Grid item key={task.id}>
                <TaskCard task={task} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ bgcolor: 'inherit', p: 2 }}
          variant='outlined'
        >
          <Typography
            sx={{ mb: 3.5, mt: 0.5 }}
            variant='h6'
          >
            Done
          </Typography>
          <Grid container spacing={2}>
            {tasks && tasks.map(task =>
              <Grid item key={task.id}>
                <TaskCard task={task} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default ProjectTasks;
