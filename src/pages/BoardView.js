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

const BoardView = (
  { createProject, resetId, queryTags, projects, results, id, tags, email, query }
) => {
  const [sidebar, setSidebar] = useApp();
  const [search, setSearch] = useState(false);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };
  const navigate = useNavigate();
  useEffect(() => { id && navigate('/project/' + id); resetId() });
  useEffect(() => { !search && queryTags(null) }, [queryTags, search]);
  const counted = results && results.map(r =>
    !r.emails.includes(email) && ({ ...r, count: 0 })
  );
  counted && counted.forEach(c =>
    query && query.forEach(q => c.tags.includes(q) && c.count++)
  );
  const sorted = counted && counted.sort((a, b) =>
    ((a.count < b.count) ? 1 : -1)
  );

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
          {sorted && sorted.map(project =>
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
  results: state.firestore.ordered.results,
  tags: state.firestore.data.tags,
  id: state.projects.id,
  query: state.tags.query,
  email: state.firebase.auth.email,
  uid: state.firebase.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (data) => dispatch(createProject(data)),
  resetId: () => dispatch({ type: 'RESETID_PROJECT' }),
  queryTags: (data) => dispatch({ type: 'QUERY_TAGS', data }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => props.query ? [
    {
      storeAs: 'projects', collection: 'projects',
      where: [['emails', 'array-contains', props.email]],
    },
    {
      storeAs: 'results', collection: 'projects',
      where: [['tags', 'array-contains-any', props.query]],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ] : [
    {
      storeAs: 'projects', collection: 'projects',
      where: [['emails', 'array-contains', props.email]],
    },
    { storeAs: 'results', collection: 'projects', limit: 30 },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ]),
)(BoardView);
