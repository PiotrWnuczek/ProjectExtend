import React from 'react';
import { useApp } from 'App';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Typography } from '@mui/material';
import { IconButton, Divider } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProfileCard from 'molecules/ProfileCard';
import IconInput from 'atoms/IconInput';

const PeopleView = ({ users }) => {
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
          People
        </Typography>
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
