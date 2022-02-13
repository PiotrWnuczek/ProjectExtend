import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Divider, Button } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
import { Menu, Subject, Chat } from '@mui/icons-material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import ProfileContent from 'organisms/ProfileContent';
import ProfileTags from 'organisms/ProfileTags';
import ProfileChats from 'organisms/ProfileChats';

const ProfileView = ({ profile, id }) => {
  const [sidebar, setSidebar] = useApp();
  const [tabs, setTabs] = useState(0);

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
          {tabs === 0 && <Button
            sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
            variant='outlined'
          >
            Make Contact
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
            icon={<Chat />}
          />
        </Tabs>
      </Box>
      <Divider />
      {profile ? <div>
        {tabs === 0 && <Box sx={{ p: 2 }}>
          <ProfileContent profile={profile} id={id} />
          <ProfileTags profile={profile} id={id} />
        </Box>}
        {tabs === 1 && <ProfileChats profile={profile} id={id} />}
      </div> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => ({
  profile: state.firestore.data[props.id],
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [{
    collection: 'users',
    doc: props.id, storeAs: props.id,
  }]),
)(ProfileView));
