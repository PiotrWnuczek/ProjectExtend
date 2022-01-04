import React, { useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createProject } from 'store/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { Menu, Search, CreateNewFolder } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProjectCard from 'molecules/ProjectCard';
import IconInput from 'atoms/IconInput';

const BoardView = ({ createProject, resetId, projects, id }) => {
  const [sidebar, setSidebar] = useApp();
  const breakpoints = { default: 3, 1100: 2, 700: 1 };
  const navigate = useNavigate();
  useEffect(() => {
    id && navigate('/project/' + id);
    resetId();
  });

  return (
    <MainLayout>
      <Box sx={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: { xs: 'space-around', sm: 'left' },
      }}>
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, m: { xs: 1, sm: 2 } }}
          onClick={() => setSidebar(!sidebar)}
        >
          <Menu />
        </IconButton>
        <Typography
          sx={{ m: { xs: 1, sm: 2 } }}
          variant='h5'
        >
          Board
        </Typography>
        <Button
          sx={{ m: { xs: 0.5, sm: 1.5 } }}
          endIcon={<CreateNewFolder />}
          onClick={() => createProject({
            name: '', keywords: '', description: '',
          })}
          variant='outlined'
        >
          Create Project
        </Button>
        <IconInput
          sx={{ m: { xs: 0.5, sm: 1.5 } }}
          icon={<Search />}
          label='Search'
          name='search'
          type='text'
          size='small'
        />
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Masonry
          breakpointCols={breakpoints}
          className='masonryGrid'
          columnClassName='masonryGridColumn'
        >
          {projects && projects.map(project =>
            project.name && <ProjectCard
              project={project}
              key={project.id}
            />
          )}
        </Masonry>
      </Box>
    </MainLayout>
  )
};

const mapStateToProps = (state) => ({
  projects: state.firestore.ordered.projects,
  id: state.projects.id,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (data) => dispatch(createProject(data)),
  resetId: () => dispatch({ type: 'RESETID_PROJECT' }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'projects' }]),
)(BoardView);
