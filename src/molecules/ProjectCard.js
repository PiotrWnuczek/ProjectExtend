import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Box, Avatar } from '@mui/material';
import { CardActionArea, CardHeader } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProjectCard = ({ project }) => {
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
          avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>
            <FolderOpen />
          </Avatar>}
        />
        <Box sx={{ p: 2, fontSize: '90%' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description.length < 200 ? project.description :
              project.description.slice(0, 200) +
              project.description.slice(200, 300).split('\n')[0] +
              '\n #### (open full description)'
            }
          </ReactMarkdown>
        </Box>
      </CardActionArea>
    </Card>
  )
};

export default ProjectCard;
