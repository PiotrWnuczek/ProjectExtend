import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardActionArea, Typography } from '@mui/material';
import { Card, CardHeader, Box, Avatar } from '@mui/material';
import { green, cyan, orange, indigo, purple } from '@mui/material/colors';
import { FolderOpen } from '@mui/icons-material';

const ProjectCard = ({ project }) => {
  const colors = [green, cyan, orange, indigo, purple];
  const number = project.name && project.name.charCodeAt(0) % 5;
  let avatarColor = project.name ? colors[number][700] : indigo[700];
  const navigate = useNavigate();

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
      variant='outlined' key={project.id}
    >
      <CardActionArea onClick={() => navigate('/project/' + project.id)}>
        <CardHeader
          title={project.name}
          subheader={project.tags.map(tag => '#' + tag + ' ')}
          avatar={<Avatar sx={{ bgcolor: avatarColor }}>
            <FolderOpen />
          </Avatar>}
        />
        <Box sx={{ p: 2 }}>
          <Typography>
            {project.description}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
};

export default ProjectCard;
