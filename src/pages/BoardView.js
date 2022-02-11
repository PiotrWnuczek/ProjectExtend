import React, { useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createProject } from 'store/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Button, IconButton } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import { Formik } from 'formik';
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton
            sx={{ display: { xs: 'flex', sm: 'none' }, my: 1.5, ml: 1 }}
            onClick={() => setSidebar(!sidebar)}
          >
            <Menu />
          </IconButton>
          <Button
            sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
            onClick={() => createProject({ name: '' })}
            variant='outlined'
          >
            New Project
          </Button>
        </Box>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={(values) => { console.log(values) }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <IconInput
                icon={<Search />}
                sx={{ my: 1.5, mr: 2 }}
                onChange={handleChange}
                value={values.password}
                label='Search'
                name='search'
                type='text'
                size='small'
              />
            </form>
          )}
        </Formik>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Masonry
          breakpointCols={breakpoints}
          className='masonryGrid'
          columnClassName='masonryGridColumn'
        >
          {projects && projects.map(project =>
            <ProjectCard
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
  firestoreConnect([{ collection: 'projects', where: [['name', '!=', '']] }]),
)(BoardView);
