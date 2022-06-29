import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Article } from '@mui/icons-material';
import Screen from 'screen.png';

const DescriptionSection = () => (
  <Grid
    sx={{ py: { xs: 5, md: 10 }, px: { xs: 5, md: 10 }, bgcolor: 'white' }}
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
              Organize team projects, quickly and easily manage agile tasks
            </Typography>
          </Box>
          <Typography variant='subtitle1'>
            Create project sprints, accurately describe tasks in Mark Down format, quickly and easily distribute team work.
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
            The new week is a new sprint full of challenges, plan tasks and note down all important matters.
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
            Ustaw projekt jako Public, aby można było wyszukać go w Social Space i aplikować do dołączenia.
          </Typography>
        </Box>
      </Box>
    </Grid>
  </Grid>
);

export default DescriptionSection;
