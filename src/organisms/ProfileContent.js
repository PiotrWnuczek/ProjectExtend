import React, { useState } from 'react';
import { Typography, Button, Accordion } from '@mui/material';
import { AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, Edit } from '@mui/icons-material';
import TextInput from 'atoms/TextInput';

const ProfileContent = () => {
  const [open, setOpen] = useState(true);

  return (
    <Accordion
      sx={{ bgcolor: 'inherit', mb: 2, '&:before': { display: 'none' } }}
      expanded={open}
      variant='outlined'
    >
      <AccordionSummary
        sx={{ pointerEvents: 'none' }}
        expandIcon={
          <ExpandMore
            sx={{ pointerEvents: 'auto' }}
            onClick={() => setOpen(!open)}
          />
        }
      >
        <Typography
          sx={{ pointerEvents: 'auto' }}
          onClick={() => setOpen(!open)}
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
  )
};

export default ProfileContent;
