import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Box, Avatar } from '@mui/material';
import { CardActionArea, CardHeader } from '@mui/material';
import { green, cyan, orange, indigo, purple } from '@mui/material/colors';
import { FolderOpen } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        <Box sx={{ p: 2, fontSize: '90%' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description.length < 500 ? project.description :
              project.description.slice(0, 500) +
              project.description.slice(500, 700).split('\n')[0] +
              '\n #### (open full description)'
            }
          </ReactMarkdown>
        </Box>
      </CardActionArea>
    </Card>
  )
};

export default ProjectCard;
