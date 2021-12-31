import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { red, green, blue, orange, indigo } from '@mui/material/colors';
import { FolderOpen } from '@mui/icons-material';

const ProjectCard = ({ project }) => {
  const colors = [red, green, blue, orange, indigo];
  const number = project.title.charCodeAt(0) % 5;
  let avatarColor = colors[number][700];
  const navigate = useNavigate();

  return (
    <Card
      sx={{ bgcolor: 'secondary.light' }}
      variant='outlined'
      key={project.id}
    >
      <CardHeader
        title={project.title}
        subheader={project.keywords}
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }}>
            {project.title[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            onClick={() => navigate('/project/' + project.id)}
          >
            <FolderOpen />
          </IconButton>
        }
      />
      <CardContent>
        <Typography>
          {project.about}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default ProjectCard;
