import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { Typography, Button, IconButton, Collapse } from '@mui/material';
import { Box, Autocomplete, TextField } from '@mui/material';
import { Tag, ExpandMore, Edit, Add } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import TagCard from 'molecules/TagCard';

const ProjectTags = ({ project, id }) => {
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const breakpoints = { default: 5, 1100: 4, 700: 3 };

  const tags = ['tag1', 'tag2'];

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='h6'>
          Tags
        </Typography>}
        avatar={<Avatar>
          <Tag />
        </Avatar>}
        action={<>
          <IconButton onClick={() => { setOpen(!open); setExpand(true); }}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <Collapse in={open} timeout='auto'>
          <Box sx={{ p: 2, display: 'flex' }}>
            <Autocomplete
              value={value}
              onInputChange={(e, value) => setValue(value)}
              renderInput={(params) => <TextField {...params} label='Tags' />}
              options={tags ? tags : []}
              freeSolo
              fullWidth
              size='small'
            />
            <Button
              onClick={() => { console.log(value); setValue(''); }}
              variant='outlined'
            >
              <Add />
            </Button>
          </Box>
        </Collapse>
        <CardContent>
          <Masonry
            breakpointCols={breakpoints}
            className='masonryGrid'
            columnClassName='masonryGridColumn'
          >
            <TagCard />
            <TagCard />
          </Masonry>
        </CardContent>
      </Collapse>
    </Card>
  )
};

export default ProjectTags;
