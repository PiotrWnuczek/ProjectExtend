import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import MainLayout from 'organisms/MainLayout';

const ProfileView = () => {
  const [active, setActive] = useState(0);

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h5' sx={{ m: 2 }}>
          Profile
        </Typography>
        <Tabs value={active} onChange={(e, v) => setActive(v)}>
          <Tab label='About' sx={{ my: 1 }} />
          <Tab label='Messages' sx={{ my: 1 }} />
        </Tabs>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Accordion variant='outlined' defaultExpanded>
          <AccordionSummary>
            <Typography>
              Section one {active}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion variant='outlined' defaultExpanded>
          <AccordionSummary>
            <Typography>
              Section two {active}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </MainLayout>
  )
};

export default ProfileView;
