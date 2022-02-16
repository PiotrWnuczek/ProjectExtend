import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { Tag, ExpandMore, Add } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import TagCard from 'molecules/TagCard';

const ProjectTags = ({ project, id }) => {
  const [expand, setExpand] = useState(false);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

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
          <IconButton onClick={() => console.log('add')}>
            <Add />
          </IconButton>
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />
      <Collapse in={expand} timeout='auto'>
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
