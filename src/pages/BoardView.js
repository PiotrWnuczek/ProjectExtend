import React from 'react';
import { useApp } from 'App';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createProject } from 'store/projectsActions';
import { Box, Typography, Divider } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProjectCard from 'molecules/ProjectCard';
import IconInput from 'atoms/IconInput';

const BoardView = ({ createProject, projects }) => {
  const [sidebar, setSidebar] = useApp();
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

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
          onClick={() => createProject({
            title: 'Creative Project',
            keywords: 'react redux firebase',
            about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus. Praesent aliquet felis odio, eu feugiat risus accumsan eu. Donec vulputate, massa vitae volutpat lobortis, tellus libero ornare libero, nec interdum arcu tellus in risus.'
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
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (data) => dispatch(createProject(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'projects' }]),
)(BoardView);
