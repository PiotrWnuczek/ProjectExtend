import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Logo from 'logo.png';

const HeroSection = () => (
  <Grid container py={5} px={{ xs: 10, md: 25 }}>
    <Grid
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      item sm={5} p={2}
    >
      <Box
        sx={{ maxWidth: 300, width: '100%', height: 'auto' }}
        component='img'
        src={Logo}
      />
    </Grid>
    <Grid
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      item sm={7} p={2}
    >
      <Typography variant='h5'>
        Szybka i prosta aplikacja do zarządzania zadaniami i projektami w metodyce agile.
      </Typography>
    </Grid>
  </Grid>
);

export default HeroSection;
