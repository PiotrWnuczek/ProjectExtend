import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createTask } from 'store/projectsActions';
import { Box, Divider, Button } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
import { Menu, Subject, Task, Chat } from '@mui/icons-material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import ProjectContent from 'organisms/ProjectContent';
import ProjectTags from 'organisms/ProjectTags';
import ProjectTasks from 'organisms/ProjectTasks';
import ProjectChats from 'organisms/ProjectChats';
import JoinCard from 'molecules/JoinCard';

const ProjectView = ({ createTask, project, id, tasks }) => {
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
            onClick={() => createTask({ content: 'new', type: 'todo' }, id)}
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
          {join && <JoinCard />}
          <ProjectContent project={project} id={id} />
          <ProjectTags project={project} id={id} />
        </Box>}
        {tabs === 1 && <ProjectTasks tasks={tasks} />}
        {tabs === 2 && <ProjectChats project={project} id={id} />}
      </div> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => ({
  project: state.firestore.data[props.id],
  skills: state.firestore.ordered.skills,
  tasks: state.firestore.ordered.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  createTask: (data, project) => dispatch(createTask(data, project)),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: 'projects', doc: props.id,
      storeAs: props.id,
    },
    {
      collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'tasks' }],
      storeAs: 'tasks',
    },
  ]),
)(ProjectView));
