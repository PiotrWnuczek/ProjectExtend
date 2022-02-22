import React, { useState, useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createProject } from 'store/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Box, Collapse } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProjectCard from 'molecules/ProjectCard';
import SearchCard from 'molecules/SearchCard';

const BoardView = ({ createProject, resetId, projects, id, tags }) => {
  const [sidebar, setSidebar] = useApp();
  const [search, setSearch] = useState(false);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };
  const navigate = useNavigate();
  useEffect(() => { id && navigate('/project/' + id); resetId() });

  return (
    <MainLayout navbar={
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
            onClick={() => createProject({
              new: true, name: 'New Name', description: 'New Description'
            })}
            variant='outlined'
          >
            New Project
          </Button>
        </Box>
        <Button
          sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
          onClick={() => setSearch(!search)}
          endIcon={<Search />}
          variant='outlined'
        >
          Search
        </Button>
      </Box>
    }>
      <Box sx={{ p: 2 }}>
        <Collapse in={search} timeout='auto'>
          <SearchCard tags={tags && tags.list} />
        </Collapse>
        <Masonry
          breakpointCols={breakpoints}
          className='masonryGrid'
          columnClassName='masonryGridColumn'
        >
          {projects && projects.map(project =>
            !project.new && <ProjectCard
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
  tags: state.firestore.data.tags,
  id: state.projects.id,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (data) => dispatch(createProject(data)),
  resetId: () => dispatch({ type: 'RESETID_PROJECT' }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      storeAs: 'projects', collection: 'projects',
      orderBy: ['date', 'desc'],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
  ]),
)(BoardView);
