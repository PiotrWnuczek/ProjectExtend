import React, { useState } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createTask } from 'store/projectsActions';
import { Box, Button, Collapse } from '@mui/material';
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

const ProjectView = ({ createTask, project, id, team, tasks, chats, tags }) => {
  const [sidebar, setSidebar] = useApp();
  const [join, setJoin] = useState(false);
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
            onClick={() => setJoin(!join)}
            variant='outlined'
            color={true ? 'primary' : 'info'}
          >
            {true ? 'Join Project' : 'Joined Project'}
          </Button>}
          {tabs === 1 && <Button
            sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
            onClick={() => createTask({ content: 'New Content' }, id)}
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
    }>
      {project ? <div>
        {tabs === 0 && <Box sx={{ p: 2 }}>
          <Collapse in={join} timeout='auto'>
            <JoinCard team={team} id={id} />
          </Collapse>
          <ProjectContent project={project} id={id} />
          <ProjectTags project={project} id={id} tags={tags && tags.list} />
          {team && <ProjectTeam team={team} id={id} />}
          {true && <OptionsMenu />}
        </Box>}
        {tasks && tabs === 1 && <ProjectTasks tasks={tasks} id={id} />}
        {chats && tabs === 2 && <ProjectChats chats={chats} id={id} />}
      </div> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => ({
  project: state.firestore.data[props.id],
  team: state.firestore.data.team,
  tasks: state.firestore.data.tasks,
  chats: state.firestore.data.chats,
  tags: state.firestore.data.tags,
  email: state.firebase.auth.email,
});

const mapDispatchToProps = (dispatch) => ({
  createTask: (data, project) => dispatch(createTask(data, project)),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => props.project && props.project.emails.includes(props.email) ? [
    {
      storeAs: props.id,
      collection: 'projects', doc: props.id
    },
    {
      storeAs: 'team', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'content', doc: 'team' }],
    },
    {
      storeAs: 'tasks', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'content', doc: 'tasks' }],
    },
    {
      storeAs: 'chats', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'content', doc: 'chats' }],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
  ] : [
    {
      storeAs: props.id,
      collection: 'projects', doc: props.id
    },
    {
      storeAs: 'team', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'content', doc: 'team' }],
    },
  ]),
)(ProjectView));
