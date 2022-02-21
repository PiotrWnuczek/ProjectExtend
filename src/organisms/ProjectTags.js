import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { Avatar, Autocomplete, TextField } from '@mui/material';
import { Tag, ExpandMore, Edit } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import TagCard from 'molecules/TagCard';

const ProjectTags = ({ project, id }) => {
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const breakpoints = { default: 5, 1100: 4, 700: 3 };
  const tags = [{ label: 'tag1', quantity: 1 }, { label: 'tag2', quantity: 2 }];

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
          <CardContent>
            <Autocomplete
              onChange={(e, value) => console.log(value)}
              renderOption={(props, option) => <li {...props}>
                {option.label} | {option.quantity}
              </li>}
              renderInput={(params) => <TextField {...params} label='Tags' />}
              options={tags}
              size='small'
              freeSolo
            />
          </CardContent>
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
