import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { Groups, ExpandMore, Edit } from '@mui/icons-material';

const ProjectTeam = ({ project, id }) => {
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
        avatar={<Avatar>
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
