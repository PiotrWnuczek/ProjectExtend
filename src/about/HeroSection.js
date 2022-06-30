import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import Logo from 'logo.png';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Grid
      sx={{ py: 10, px: { xs: 5, md: 20 } }}
      container
    >
      <Grid
        sx={{
          p: 2, display: 'flex', alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'right' },
        }}
        item xs={12} sm={5}
      >
        <Box
          sx={{ maxWidth: 300, width: '80%', height: 'auto' }}
          component='img'
          src={Logo}
        />
      </Grid>
      <Grid
        sx={{
          p: 2, display: 'flex', alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'left' },
        }}
        item xs={12} sm={7}
      >
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography
            sx={{
              my: 1, fontSize: { xs: 26, md: 36 }, fontWeight: 600,
              letterSpacing: 2, color: 'primary.dark',
            }}
            variant='h1'
          >
            Project Extend
          </Typography>
          <Typography
            sx={{
              my: 1, fontSize: { xs: 14, md: 18 }, fontWeight: 400,
              letterSpacing: 1,
            }}
            variant='subtitle1'
          >
            Professional application for quick and easy
            task and project management with the agile method
          </Typography>
          <Button
            sx={{ mt: 1, mr: 1 }}
            onClick={() => navigate('/signin')}
            variant='contained'
          >
            SignIn
          </Button>
          <Button
            sx={{ mt: 1 }}
            onClick={() => navigate('/signup')}
            variant='outlined'
          >
            SignUp
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
};

export default HeroSection;
