import React, { useState } from 'react';
import { Typography, Button, Accordion } from '@mui/material';
import { AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, Add } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import SkillCard from 'molecules/SkillCard';

const ProfileSkills = () => {
  const [open, setOpen] = useState(true);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

  return (
    <Accordion
      sx={{ bgcolor: 'inherit', mb: 2, '&:before': { display: 'none' } }}
      expanded={open}
      variant='outlined'
    >
      <AccordionSummary
        sx={{ pointerEvents: 'none' }}
        expandIcon={<ExpandMore
          sx={{ pointerEvents: 'auto' }}
          onClick={() => setOpen(!open)}
        />}
      >
        <Typography
          sx={{ pointerEvents: 'auto' }}
          onClick={() => setOpen(!open)}
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
          <SkillCard />
          <SkillCard />
        </Masonry>
      </AccordionDetails>
    </Accordion>
  )
};

export default ProfileSkills;
