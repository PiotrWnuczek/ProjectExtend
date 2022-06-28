import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { AccountTree, ManageAccounts, Groups } from '@mui/icons-material';

const FeaturesSection = () => (
  <Grid
    sx={{ py: { xs: 5, md: 10 }, px: { xs: 5, md: 10 }, bgcolor: 'white' }}
    container
  >
    <Grid
      sx={{ p: 2 }}
      item xs={12} sm={4}
    >
      <Avatar
        sx={{
          mb: 2, width: 80, height: 80, color: 'info.main',
          bgcolor: 'secondary.main', borderRadius: 5,
        }}
        variant='square'
      >
        <AccountTree sx={{ fontSize: 50 }} />
      </Avatar>
      <Typography
        sx={{ fontSize: 18 }}
        variant='body1'
      >
        Are you a programmer, student, or just want to organize your projects well?
      </Typography>
    </Grid>
    <Grid
      sx={{ p: 2 }}
      item xs={12} sm={4}
    >
      <Avatar
        sx={{
          mb: 2, width: 80, height: 80, color: 'info.main',
          bgcolor: 'secondary.main', borderRadius: 5,
        }}
        variant='square'
      >
        <ManageAccounts sx={{ fontSize: 50 }} />
      </Avatar>
      <Typography
        sx={{ fontSize: 18 }}
        variant='body1'
      >
        Do you need a simple tool to manage tasks individually or in a team?
      </Typography>
    </Grid>
    <Grid
      sx={{ p: 2 }}
      item xs={12} sm={4}
    >
      <Avatar
        sx={{
          mb: 2, width: 80, height: 80, color: 'info.main',
          bgcolor: 'secondary.main', borderRadius: 5,
        }}
        variant='square'
      >
        <Groups sx={{ fontSize: 50 }} />
      </Avatar>
      <Typography
        sx={{ fontSize: 18 }}
        variant='body1'
      >
        Do you want to create project teams or search and join interesting projects?
      </Typography>
    </Grid>
  </Grid>
);

export default FeaturesSection;
