import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Collapse } from '@mui/material';
import { Typography, IconButton, Avatar } from '@mui/material';
import { Tag, ExpandMore, Add } from '@mui/icons-material';
import { red, green, blue, orange, indigo } from '@mui/material/colors';
import Masonry from 'react-masonry-css';
import TagCard from 'molecules/TagCard';

const ProjectTags = ({ project, id }) => {
  const colors = [red, green, blue, orange, indigo];
  const number = project.name && project.name.charCodeAt(0) % 5;
  let avatarColor = project.name ? colors[number][700] : blue[700];
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
        avatar={<Avatar sx={{ bgcolor: avatarColor }}>
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
