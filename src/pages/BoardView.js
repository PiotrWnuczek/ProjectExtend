import React, { useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createProject } from 'store/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProjectCard from 'molecules/ProjectCard';

const BoardView = ({ createProject, resetId, projects, newProject }) => {
  const [sidebar, setSidebar] = useApp();
  const breakpoints = { default: 2, 1000: 1 };
  const navigate = useNavigate();
  useEffect(() => { newProject && navigate('/project/' + newProject); resetId() });

  return (
    <MainLayout navbar={
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, my: 1.5, ml: 1 }}
          onClick={() => setSidebar(!sidebar)}
        >
          <Menu />
        </IconButton>
        <Button
          sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
          onClick={() => createProject({ key: null })}
          variant='outlined'
        >
          New Project
        </Button>
      </Box>
    }>
      <Box sx={{ p: 2 }}>
        <Masonry
          breakpointCols={breakpoints}
          className='masonryGrid'
          columnClassName='masonryGridColumn'
        >
          {projects && projects.map(project =>
            project.key && <ProjectCard
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
  newProject: state.projects.newProject,
  email: state.firebase.auth.email,
  uid: state.firebase.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (data) => dispatch(createProject(data)),
  resetId: () => dispatch({ type: 'RESETID_PROJECT' }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {
      storeAs: 'projects', collection: 'projects',
      where: [['emails', 'array-contains', props.email]],
    },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ]),
)(BoardView);
