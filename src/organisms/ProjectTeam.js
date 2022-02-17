import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { Groups, ExpandMore, Edit, Person } from '@mui/icons-material';

const ProjectTeam = ({ team, id }) => {
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
          <List sx={{ p: 0 }}>
            {team.members.map(member =>
              <ListItem sx={{ p: 0 }} key={member}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={member} />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
};

export default ProjectTeam;
