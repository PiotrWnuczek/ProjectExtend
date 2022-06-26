import React from 'react';
import { Box } from '@mui/material';
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
  </Box>
);

export default AboutView;
