import React, { useState, useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Collapse, Divider } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProfileCard from 'molecules/ProfileCard';
import SearchCard from 'molecules/SearchCard';

const PeopleView = ({ searchTags, users, results, tags }) => {
  const [sidebar, setSidebar] = useApp();
  const [search, setSearch] = useState(false);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };
  useEffect(() => { !search && searchTags([null]) }, [searchTags, search]);

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
            onClick={() => console.log('invite')}
            variant='outlined'
          >
            Invite Friend
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
        <Masonry
          breakpointCols={breakpoints}
          className='masonryGrid'
          columnClassName='masonryGridColumn'
        >
          {users && users.map(user =>
            <ProfileCard
              user={user}
              key={user.id}
            />
          )}
        </Masonry>
        {search && <div>
          <Divider sx={{ mb: 2 }} />
          <Masonry
            breakpointCols={breakpoints}
            className='masonryGrid'
            columnClassName='masonryGridColumn'
          >
            {results && results.map(result =>
              !result.new && <ProfileCard
                user={result}
                key={result.id}
              />
            )}
          </Masonry>
        </div>}
      </Box>
    </MainLayout>
  )
};

const mapStateToProps = (state) => ({
  users: state.firestore.ordered.users,
  results: state.firestore.ordered.results,
  tags: state.firestore.data.tags,
  search: state.tags.search,
  email: state.firebase.auth.email,
});

const mapDispatchToProps = (dispatch) => ({
  searchTags: (data) => dispatch({ type: 'SEARCH_TAGS', data }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => props.search ? [
    {
      storeAs: 'users', collection: 'users',
      where: [['email', '==', props.email]],
    },
    {
      storeAs: 'results', collection: 'users',
      where: [['tags', 'array-contains-any', props.search]],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
  ] : [
    {
      storeAs: 'users', collection: 'users',
      where: [['email', '==', props.email]],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
  ]),
)(PeopleView);
