import React from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Divider, Button, IconButton } from '@mui/material';
import { Menu, Search } from '@mui/icons-material';
import { Formik } from 'formik';
import Masonry from 'react-masonry-css';
import MainLayout from 'pages/MainLayout';
import ProfileCard from 'molecules/ProfileCard';
import IconInput from 'atoms/IconInput';

const PeopleView = ({ users }) => {
  const [sidebar, setSidebar] = useApp();
  const breakpoints = { default: 3, 1100: 2, 700: 1 };

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
            variant='outlined'
          >
            Invite Friend
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
