import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { green, cyan, orange, indigo, purple } from '@mui/material/colors';
import { FolderOpen, Input } from '@mui/icons-material';

const ProjectCard = ({ project }) => {
  const colors = [green, cyan, orange, indigo, purple];
  const number = project.name && project.name.charCodeAt(0) % 5;
  let avatarColor = project.name ? colors[number][700] : indigo[700];
  const navigate = useNavigate();

  return (
    <Card
      sx={{ bgcolor: 'secondary.light' }}
      variant='outlined'
      key={project.id}
    >
      <CardHeader
        title={project.name}
        subheader={project.keywords}
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }}>
            <FolderOpen />
          </Avatar>
        }
        action={
          <IconButton
            onClick={() => navigate('/project/' + project.id)}
          >
            <Input />
          </IconButton>
        }
      />
      <CardContent>
        <Typography>
          {project.description}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default ProjectCard;
