import React, { useState } from 'react';
import { useApp } from 'App';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { IconButton, Divider, Tabs, Tab } from '@mui/material';
import { Masonry } from '@mui/lab';
import { Menu, ExpandMore } from '@mui/icons-material';
import MainLayout from 'organisms/MainLayout';
import TextInput from 'atoms/TextInput';

const ProfileView = () => {
  const [active, setActive] = useState(0);
  const [sidebar, setSidebar] = useApp();

  return (
    <MainLayout>
      <Box sx={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: { xs: 'space-around', sm: 'left' },
      }}>
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, m: { xs: 1, sm: 2 } }}
          onClick={() => setSidebar(!sidebar)}
        >
          <Menu />
        </IconButton>
        <Typography
          sx={{ m: { xs: 1, sm: 2 } }}
          variant='h5'
        >
          Profile
        </Typography>
        <Tabs
          value={active}
          onChange={(e, v) => setActive(v)}
        >
          <Tab
            sx={{ py: { xs: 2.4, sm: 2.9 } }}
            label='About' />
          <Tab
            sx={{ py: { xs: 2.4, sm: 2.9 } }}
            label='Messages'
          />
        </Tabs>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Accordion
          sx={{ mb: 2, '&:before': { display: 'none' }, background: '#f8f8f8' }}
          variant='outlined'
          defaultExpanded
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant='h6'>
              About
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextInput
              label='content'
              rows={7}
              multiline
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ mb: 2, '&:before': { display: 'none' }, background: '#f8f8f8' }}
          variant='outlined'
          defaultExpanded
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant='h6'>
              Skills
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Masonry
              sx={{ m: 0 }}
              columns={{ xs: 1, sm: 2, md: 3 }}
              spacing={2}
            >
              <Card variant='outlined'>
                <CardContent>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus. Praesent aliquet felis odio, eu feugiat risus accumsan eu. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
                  </Typography>
                </CardContent>
              </Card>
            </Masonry>
          </AccordionDetails>
        </Accordion>
      </Box>
    </MainLayout>
  )
};

export default ProfileView;
