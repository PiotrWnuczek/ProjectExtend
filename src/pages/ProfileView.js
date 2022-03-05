import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Button } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
import { Menu, Subject, Notifications } from '@mui/icons-material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import ProfileContent from 'organisms/ProfileContent';
import ProfileTags from 'organisms/ProfileTags';
import ProfileNews from 'organisms/ProfileNews';

const ProfileView = ({ profile, id, tags }) => {
  const [sidebar, setSidebar] = useApp();
  const [tabs, setTabs] = useState(0);

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
          {tabs === 0 && <Button
            sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
            onClick={() => console.log('like')}
            variant='outlined'
            color={true ? 'primary' : 'info'}
          >
            {true ? 'Like Profile' : 'Liked Profile'}
          </Button>}
          {tabs === 1 && <Button
            sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
            variant='outlined'
          >
            Create Chat
          </Button>}
        </Box>
        <Tabs
          sx={{ mr: 2 }}
          value={tabs}
          onChange={(e, v) => setTabs(v)}
        >
          <Tab
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Subject />}
          />
          <Tab
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Notifications />}
          />
        </Tabs>
      </Box>
    }>
      {profile ? <div>
        {tabs === 0 && <Box sx={{ p: 2 }}>
          <ProfileContent profile={profile} id={id} />
          <ProfileTags profile={profile} id={id} tags={tags && tags.list} />
        </Box>}
        {tabs === 1 && <ProfileNews profile={profile} id={id} />}
      </div> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => ({
  profile: state.firestore.data[props.id],
  tags: state.firestore.data.tags,
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    { storeAs: props.id, collection: 'users', doc: props.id },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
  ]),
)(ProfileView));
