import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateTasks } from 'store/projectsActions';
import { Box, Divider, Button, Collapse } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
import { Menu, Subject, Task, Chat } from '@mui/icons-material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import ProjectContent from 'organisms/ProjectContent';
import ProjectTags from 'organisms/ProjectTags';
import ProjectTeam from 'organisms/ProjectTeam';
import ProjectTasks from 'organisms/ProjectTasks';
import ProjectChats from 'organisms/ProjectChats';
import JoinCard from 'molecules/JoinCard';
import OptionsMenu from 'atoms/OptionsMenu';

const ProjectView = ({ updateTasks, project, id, tasks, chats }) => {
  const [sidebar, setSidebar] = useApp();
  const [join, setJoin] = useState(false);
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
            onClick={() => setJoin(!join)}
            variant='outlined'
          >
            Join Project
          </Button>}
          {tabs === 1 && <Button
            sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
            onClick={() => updateTasks({
              list: [{ content: 'new', type: 'todo' }, ...tasks.list],
            }, id)}
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
          <Collapse in={join} timeout='auto'>
            <JoinCard />
          </Collapse>
          <ProjectContent project={project} id={id} />
          <ProjectTags project={project} id={id} />
          <ProjectTeam project={project} id={id} />
          <OptionsMenu />
        </Box>}
        {tasks && tabs === 1 && <ProjectTasks tasks={tasks.list} />}
        {chats && tabs === 2 && <ProjectChats chats={chats.list} />}
      </div> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => {
  const project = state.firestore.data[props.id];
  const extensions = state.firestore.data.extensions;
  return {
    project: project,
    tasks: extensions && extensions.tasks,
    chats: extensions && extensions.chats,
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateTasks: (data, project) => dispatch(updateTasks(data, project)),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => true ? [
    {
      collection: 'projects', doc: props.id,
      storeAs: props.id,
    },
    {
      collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'extensions' }],
      storeAs: 'extensions',
    },
  ] : [
    {
      collection: 'projects', doc: props.id,
      storeAs: props.id,
    },
  ]),
)(ProjectView));
