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

const SpaceView = ({ createProject, resetId, queryTags, results, id, tags, email, query }) => {
  const [sidebar, setSidebar] = useApp();
  const [search, setSearch] = useState(false);
  const breakpoints = { default: 2, 1000: 1 };
  const navigate = useNavigate();
  useEffect(() => { id && navigate('/project/' + id); resetId() });
  useEffect(() => { !search && queryTags(null) }, [queryTags, search]);

  const filtered = results && results.filter(r => !r.emails.includes(email));
  const mapped = filtered && filtered.map(r => ({ ...r, count: 0 }));
  mapped && mapped.forEach(r =>
    query && query.forEach(q => r.tags.includes(q) && r.count++)
  );
  const sorted = mapped && mapped.sort((a, b) =>
    ((a.count < b.count) ? 1 : -1)
  );

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
      storeAs: 'results', collection: 'projects',
      where: [['tags', 'array-contains-any', props.query]],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ] : [
    { storeAs: 'results', collection: 'projects', limit: 30 },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ]),
)(SpaceView);
