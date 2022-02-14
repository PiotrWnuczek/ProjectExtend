import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Collapse } from '@mui/material';
import { Typography, IconButton, Avatar } from '@mui/material';
import { Groups, ExpandMore, Edit } from '@mui/icons-material';
import { red, green, blue, orange, indigo } from '@mui/material/colors';

const ProjectTeam = ({ project, id }) => {
  const colors = [red, green, blue, orange, indigo];
  const number = project.name && project.name.charCodeAt(0) % 5;
  let avatarColor = project.name ? colors[number][700] : blue[700];
  const [expand, setExpand] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='h6'>
          Team
        </Typography>}
        avatar={<Avatar sx={{ bgcolor: avatarColor }}>
          <Groups />
        </Avatar>}
        action={<>
          <IconButton onClick={() => console.log('edit')}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <CardContent>
          team
        </CardContent>
      </Collapse>
    </Card>
  )
};

export default ProjectTeam;
