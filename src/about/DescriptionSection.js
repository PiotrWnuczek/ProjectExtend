import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Article } from '@mui/icons-material';
import Screen from 'screen.png';

const DescriptionSection = () => (
  <Grid
    sx={{ py: 10, px: { xs: 5, md: 10 }, bgcolor: 'white' }}
    container
  >
    <Grid
      sx={{
        p: 2, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
      }}
      item xs={12} md={6}
    >
      <Box
        sx={{ maxWidth: 600, width: '100%', height: 'auto' }}
        component='img'
        src={Screen}
      />
    </Grid>
    <Grid
      sx={{
        p: 2, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
      }}
      item xs={12} md={6}
    >
      <Box>
        <Box sx={{ my: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Article sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              sx={{ fontWeight: 700 }}
              variant='button'
            >
              Organize team projects, manage tasks quickly and easily
            </Typography>
          </Box>
          <Typography variant='subtitle1'>
            Create project sprints, accurately describe tasks in Mark Down format,
            quickly and easily distribute teamwork.
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Article sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              sx={{ fontWeight: 700 }}
              variant='button'
            >
              Plan your time and organize tasks for each week
            </Typography>
          </Box>
          <Typography variant='subtitle1'>
            The new week is a new sprint full of challenges,
            so plan your tasks and note down all the important things.
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Article sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              sx={{ fontWeight: 700 }}
              variant='button'
            >
              Build project teams and join interesting projects
            </Typography>
          </Box>
          <Typography variant='subtitle1'>
            Make your project Public so it can be
            searched in the community space and applied to join.
          </Typography>
        </Box>
      </Box>
    </Grid>
  </Grid>
);

export default DescriptionSection;
