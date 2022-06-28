import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import HeroSection from 'about/HeroSection';
import ActionsSection from 'about/ActionsSection';
import FeaturesSection from 'about/FeaturesSection';
import DescriptionSection from 'about/DescriptionSection';

const AboutView = () => (
  <Box>
    <HeroSection />
    <FeaturesSection />
    <ActionsSection />
    <DescriptionSection />
    <Box sx={{
      p: 2, bgcolor: 'white', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Typography>
        Copyright © projectextend.com
      </Typography>
      <Link
        sx={{ ml: 1 }}
        href='https://piotrwnuczek.pl/'
        target='_blank'
        underline='hover'
      >
        Created by Piotr Wnuczek
      </Link>
    </Box>
  </Box>
);

export default AboutView;
