import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import TaskCard from 'molecules/TaskCard';

const ProjectTasks = () => (
  <Box sx={{ p: 2 }}>
    <Grid container spacing={2}>
      <Grid item sx={12} md={6}>
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
          <TaskCard />
          <Box sx={{ mb: 2 }} />
          <TaskCard />
        </Paper>
      </Grid>
      <Grid item sx={12} md={6}>
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
          <TaskCard />
          <Box sx={{ mb: 2 }} />
          <TaskCard />
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default ProjectTasks;
