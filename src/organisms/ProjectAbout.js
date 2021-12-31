import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, Add, Edit } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import TextInput from 'atoms/TextInput';

const ProjectAbout = () => {
  const [content, setContent] = useState(true);
  const [skills, setSkills] = useState(true);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

  return (
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
  )
};

export default ProjectAbout;
