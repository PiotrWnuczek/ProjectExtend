import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Collapse } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProfileCard from 'molecules/ProfileCard';
import SearchCard from 'molecules/SearchCard';

const PeopleView = ({ users }) => {
  const [sidebar, setSidebar] = useApp();
  const [search, setSearch] = useState(false);
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

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
        <Collapse in={search} timeout='auto'>
          <SearchCard />
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
      </Box>
    </MainLayout>
  )
};

const mapStateToProps = (state) => ({
  users: state.firestore.ordered.users,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'users' }]),
)(PeopleView);
