import React, { useState, useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createProject } from 'store/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Box, Collapse, Divider } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProjectCard from 'molecules/ProjectCard';
import SearchCard from 'molecules/SearchCard';

const BoardView = ({ createProject, resetId, searchTags, projects, results, id, tags, email }) => {
  const [sidebar, setSidebar] = useApp();
  const [search, setSearch] = useState(false);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };
  const navigate = useNavigate();
  useEffect(() => { id && navigate('/project/' + id); resetId() });
  useEffect(() => { !search && searchTags(null) }, [searchTags, search]);

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
              key: null, name: 'New Name', description: 'New Description'
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
        <Collapse in={search} timeout='auto' unmountOnExit>
          <SearchCard tags={tags && tags.list} />
        </Collapse>
        {!search && <Masonry
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
        </Masonry>}
        {projects && projects.length > 0 && <Divider sx={{ mb: 2 }} />}
        <Masonry
          breakpointCols={breakpoints}
          className='masonryGrid'
          columnClassName='masonryGridColumn'
        >
          {results && results.map(result =>
            result.key && !result.emails.includes(email) && <ProjectCard
              project={result}
              key={result.id}
            />
          )}
        </Masonry>
      </Box>
    </MainLayout>
  )
};

const mapStateToProps = (state) => ({
  projects: state.firestore.ordered.projects,
  results: state.firestore.ordered.results,
  tags: state.firestore.data.tags,
  id: state.projects.id,
  search: state.tags.search,
  email: state.firebase.auth.email,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (data) => dispatch(createProject(data)),
  resetId: () => dispatch({ type: 'RESETID_PROJECT' }),
  searchTags: (data) => dispatch({ type: 'SEARCH_TAGS', data }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => props.search ? [
    {
      storeAs: 'projects', collection: 'projects',
      where: [['emails', 'array-contains', props.email]],
    },
    {
      storeAs: 'results', collection: 'projects',
      where: [['tags', 'array-contains-any', props.search]],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
  ] : [
    {
      storeAs: 'projects', collection: 'projects',
      where: [['emails', 'array-contains', props.email]],
    },
    { storeAs: 'results', collection: 'projects', limit: 30 },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
  ]),
)(BoardView);
