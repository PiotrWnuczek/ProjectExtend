import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Typography, Divider } from '@mui/material';
import { Button, IconButton, Tabs, Tab } from '@mui/material';
import { Menu, Input, Task, Chat } from '@mui/icons-material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import ProjectContent from 'organisms/ProjectContent';
import ProjectSkills from 'organisms/ProjectSkills';
import ProjectTasks from 'organisms/ProjectTasks';
import ProjectChats from 'organisms/ProjectChats';

const ProjectView = ({ project, id }) => {
  const [sidebar, setSidebar] = useApp();
  const [tabs, setTabs] = useState(0);

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
          Project
        </Typography>
        {tabs === 0 && <Button
          sx={{ m: { xs: 0.5, sm: 1.5 } }}
          endIcon={<Input />}
          variant='outlined'
        >
          Join Project
        </Button>}
        {tabs === 1 && <Button
          sx={{ m: { xs: 0.5, sm: 1.5 } }}
          endIcon={<Task />}
          variant='outlined'
        >
          Create Task
        </Button>}
        {tabs === 2 && <Button
          sx={{ m: { xs: 0.5, sm: 1.5 } }}
          endIcon={<Chat />}
          variant='outlined'
        >
          Create Chat
        </Button>}
        <Tabs
          value={tabs}
          onChange={(e, v) => setTabs(v)}
        >
          <Tab
            sx={{ py: { xs: 2.4, sm: 2.9 } }}
            label='About'
          />
          <Tab
            sx={{ py: { xs: 2.4, sm: 2.9 } }}
            label='Tasks'
          />
          <Tab
            sx={{ py: { xs: 2.4, sm: 2.9 } }}
            label='Chats'
          />
        </Tabs>
      </Box>
      <Divider />
      {project ? <div>
        {tabs === 0 && <Box sx={{ p: 2 }}>
          <ProjectContent project={project} id={id} />
          <ProjectSkills project={project} id={id} />
        </Box>}
        {tabs === 1 && <ProjectTasks project={project} id={id} />}
        {tabs === 2 && <ProjectChats project={project} id={id} />}
      </div> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state) => ({
  project: state.firestore.data.project,
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [{
    collection: 'projects',
    doc: props.id,
    storeAs: 'project',
  }]),
)(ProjectView));
