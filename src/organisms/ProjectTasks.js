import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import TaskCard from 'molecules/TaskCard';

const ProjectTasks = () => (
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
            <Grid item>
              <TaskCard />
            </Grid>
            <Grid item>
              <TaskCard />
            </Grid>
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
            <Grid item>
              <TaskCard />
            </Grid>
            <Grid item>
              <TaskCard />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default ProjectTasks;
