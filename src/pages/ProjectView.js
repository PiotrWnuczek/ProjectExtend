import React, { useState, useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createTask, createChat } from 'store/projectsActions';
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
import ProjectMenu from 'molecules/ProjectMenu';

const ProjectView = (
  { createTask, createChat, project, id, team, tasks, chats, tags, email, uid, user }
) => {
  const [sidebar, setSidebar] = useApp();
  const [join, setJoin] = useState(false);
  const [tabs, setTabs] = useState(0);
  const [task, setTask] = useState(null);
  const random = Math.random().toString(16).slice(2);
  const candidate = team && team.candidates.find(c => c.email === email);
  const member = team && team.members.find(m => m.email === email);
  useEffect(() => { candidate && setJoin(true) }, [candidate, setJoin]);
  useEffect(() => { member && setJoin(true) }, [member, setJoin]);

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
          >
            Join Project
          </Button>}
          {tabs === 1 && <Button
            sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
            onClick={() => {
              createTask({ id: random, content: 'New Content' }, id);
              setTask(random);
            }}
            variant='outlined'
          >
            Create Task
          </Button>}
          {tabs === 2 && <Button
            sx={{ my: 1.5, mx: 2, whiteSpace: 'nowrap' }}
            onClick={() => createChat({ id: random, content: 'New Content' }, id)}
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
            disabled={member ? false : true}
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Task />}
          />
          <Tab
            disabled={member ? false : true}
            sx={{ py: 2.5, minWidth: { xs: 50, sm: 100 } }}
            icon={<Chat />}
          />
        </Tabs>
      </Box>
    }>
      {project ? <div>
        {tabs === 0 && <Box sx={{ p: 2 }}>
          <Collapse in={join} timeout='auto'>
            {!member && <JoinCard
              pro={project} team={team} id={id} email={email} uid={uid} user={user}
              candidate={candidate}
            />}
            {member && team.candidates.map((c, i) => <JoinCard
              pro={project} team={team} id={id} email={email} uid={uid} user={user} key={i}
              candidate={c} member={true}
            />)}
          </Collapse>
          <ProjectContent project={project} id={id} member={member} />
          <ProjectTags project={project} id={id} tags={tags && tags.list} member={member} />
          {team && <ProjectTeam team={team} member={member} id={id} />}
          {member && <ProjectMenu pro={project} id={id} team={team} email={email} />}
        </Box>}
        {member && tasks && tabs === 1 && <ProjectTasks tasks={tasks} id={id} task={task} />}
        {member && chats && tabs === 2 && <ProjectChats chats={chats} id={id} />}
      </div> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => ({
  project: state.firestore.data[props.id],
  team: state.firestore.data[props.id + 'team'],
  tasks: state.firestore.data[props.id + 'tasks'],
  chats: state.firestore.data[props.id + 'chats'],
  tags: state.firestore.data.tags,
  email: state.firebase.auth.email,
  uid: state.firebase.auth.uid,
  user: state.firestore.data[state.firebase.auth.uid],
});

const mapDispatchToProps = (dispatch) => ({
  createTask: (data, project) => dispatch(createTask(data, project)),
  createChat: (data, project) => dispatch(createChat(data, project)),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => props.project && props.project.emails.includes(props.email) ? [
    { storeAs: props.id, collection: 'projects', doc: props.id },
    {
      storeAs: props.id + 'team', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'content', doc: 'team' }],
    },
    {
      storeAs: props.id + 'tasks', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'content', doc: 'tasks' }],
    },
    {
      storeAs: props.id + 'chats', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'content', doc: 'chats' }],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ] : [
    { storeAs: props.id, collection: 'projects', doc: props.id },
    {
      storeAs: props.id + 'team', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'content', doc: 'team' }],
    },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ]),
)(ProjectView));
