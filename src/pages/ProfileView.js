import React from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Button, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import ProfileContent from 'organisms/ProfileContent';
import ProfileTags from 'organisms/ProfileTags';

const ProfileView = ({ profile, id, tags, uid }) => {
  const [sidebar, setSidebar] = useApp();
  const owner = uid && uid === id;

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
          onClick={() => window.location = 'mailto:' + profile.email + '?subject=ProjectExtend'}
          variant='outlined'
        >
          Send Email
        </Button>
      </Box>
    }>
      {profile ? <Box sx={{ p: 2 }}>
        <ProfileContent profile={profile} id={id} owner={owner} />
        <ProfileTags profile={profile} id={id} tags={tags && tags.list} owner={owner} />
      </Box> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => ({
  profile: state.firestore.data[props.id],
  tags: state.firestore.data.tags,
  uid: state.firebase.auth.uid,
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { storeAs: props.id, collection: 'users', doc: props.id },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
  ]),
)(ProfileView));
