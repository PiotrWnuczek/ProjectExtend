import React, { useState } from 'react';
import { useApp } from 'App';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Button, IconButton, Divider, Tabs, Tab } from '@mui/material';
import { Menu, ExpandMore, Add, Edit } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'organisms/MainLayout';
import TextInput from 'atoms/TextInput';

const ProfileView = () => {
  const [sidebar, setSidebar] = useApp();
  const [tabs, setTabs] = useState(0);
  const [content, setContent] = useState(true);
  const [skills, setSkills] = useState(true);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

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
          value={tabs}
          onChange={(e, v) => setTabs(v)}
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
          sx={{ bgcolor: 'inherit', mb: 2, '&:before': { display: 'none' } }}
          expanded={content}
          variant='outlined'
        >
          <AccordionSummary
            sx={{ pointerEvents: 'none' }}
            expandIcon={<ExpandMore
              sx={{ pointerEvents: 'auto' }}
              onClick={() => setContent(!content)}
            />}
          >
            <Typography
              sx={{ pointerEvents: 'auto' }}
              onClick={() => setContent(!content)}
              variant='h6'
            >
              Content
            </Typography>
            <Button
              sx={{ pointerEvents: 'auto', mx: 2 }}
              endIcon={<Edit />}
              variant='outlined'
              size='small'
            >
              Edit
            </Button>
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
          sx={{ bgcolor: 'inherit', mb: 2, '&:before': { display: 'none' } }}
          expanded={skills}
          variant='outlined'
        >
          <AccordionSummary
            sx={{ pointerEvents: 'none' }}
            expandIcon={<ExpandMore
              sx={{ pointerEvents: 'auto' }}
              onClick={() => setSkills(!skills)}
            />}
          >
            <Typography
              sx={{ pointerEvents: 'auto' }}
              onClick={() => setSkills(!skills)}
              variant='h6'
            >
              Skills
            </Typography>
            <Button
              sx={{ pointerEvents: 'auto', mx: 2 }}
              endIcon={<Add />}
              variant='outlined'
              size='small'
            >
              Add
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <Masonry
              breakpointCols={breakpoints}
              className='masonryGrid'
              columnClassName='masonryGridColumn'
            >
              <Card
                sx={{ bgcolor: 'secondary.light' }}
                variant='outlined'
              >
                <CardContent>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus augue sed sollicitudin ultricies. Mauris nec ultrices ligula. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.
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
