import React, { useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createProject } from 'store/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Button, IconButton } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, my: 1.5, ml: 1 }}
          onClick={() => setSidebar(!sidebar)}
        >
          <Menu />
        </IconButton>
        <Button
          sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
          onClick={() => createProject({
            name: '', keywords: '', description: '',
          })}
          variant='outlined'
        >
          New Project
        </Button>
        <IconInput
          sx={{ my: 1.5, mr: 2, width: { xs: 100, sm: 200 } }}
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
