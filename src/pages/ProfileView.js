import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import MainLayout from 'organisms/MainLayout';

const ProfileView = () => {
  const [active, setActive] = useState(0);

  return (
    <MainLayout>
      <Typography
        variant='h5'
        sx={{ display: 'inline-flex', m: 2 }}
      >
        Profile
      </Typography>
      <Tabs
        value={active}
        onChange={(e, v) => setActive(v)}
        sx={{ display: 'inline-flex' }}
      >
        <Tab label='About' sx={{ py: 2.3 }} />
        <Tab label='Messages' sx={{ py: 2.3 }} />
      </Tabs>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Accordion
          variant='outlined'
          sx={{ mb: 2 }}
          defaultExpanded
        >
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
        <Accordion
          variant='outlined'
          sx={{ mb: 2 }}
          defaultExpanded
        >
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
