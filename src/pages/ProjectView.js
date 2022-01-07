import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Divider, Button } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          Join Project
        </Button>}
        {tabs === 1 && <Button
          sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
          variant='outlined'
        >
          Create Task
        </Button>}
        {tabs === 2 && <Button
          sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
          variant='outlined'
        >
          Create Chat
        </Button>}
        <Tabs
          value={tabs}
          onChange={(e, v) => setTabs(v)}
        >
          <Tab
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Input />}
          />
          <Tab
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Task />}
          />
          <Tab
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Chat />}
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
