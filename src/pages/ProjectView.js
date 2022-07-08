import React, { useState, useEffect } from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createTask } from 'store/projectsActions';
import { Box, Button, Collapse } from '@mui/material';
import { IconButton, Tabs, Tab } from '@mui/material';
import { Menu, Subject, Task } from '@mui/icons-material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import ProjectContent from 'organisms/ProjectContent';
import ProjectTags from 'organisms/ProjectTags';
import ProjectTeam from 'organisms/ProjectTeam';
import ProjectTasks from 'organisms/ProjectTasks';
import SprintCard from 'molecules/SprintCard';
import JoinCard from 'molecules/JoinCard';
import ProjectMenu from 'molecules/ProjectMenu';

const ProjectView = ({ createTask, project, id, sprints, tags, email, uid, user }) => {
  const random = Math.random().toString(16).slice(2);
  const candidate = project && project.candidates.find(c => c.email === email);
  const member = project && project.members.find(m => m.email === email);
  const [sidebar, setSidebar] = useApp();
  const [sid, setSid] = useState(false);
  const [join, setJoin] = useState(false);
  const [tabs, setTabs] = useState(0);
  useEffect(() => { candidate && setJoin(true) }, [candidate, setJoin]);
  useEffect(() => { member && setJoin(true) }, [member, setJoin]);
  const now = new Date();
  const diffs = sprints &&
    sprints.map(sprint => sprint.date && (sprint.date.toDate() - now));
  const plusDiff = diffs && Math.min(...diffs.filter(diff => diff > 0));
  const minusDiff = diffs && Math.max(...diffs.filter(diff => diff < 0));
  const diff = plusDiff !== Infinity ? plusDiff : minusDiff;
  const current = sprints &&
    sprints.filter(sprint => sprint.date && ((sprint.date.toDate() - now) === diff))[0];
  const select = sid === 'new' ?
    sprints && sprints[0] :
    sprints && sprints.filter(sprint => sprint.id === sid)[0];
  const sprint = sid ? select : current || (sprints && sprints[0]);
  const sorted = sprints && [...sprints].sort((a, b) => a.date - b.date);

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
            onClick={() => createTask({
              id: random, content: 'New Content',
              assigned: [member.nickname], date: new Date(),
            }, sprint.id, id)}
            variant='outlined'
          >
            Create Task
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
        </Tabs>
      </Box>
    }>
      {project ? <div>
        {tabs === 0 && <Box sx={{ p: 2 }}>
          <Collapse in={join} timeout='auto'>
            {!member && <JoinCard
              project={project} id={id} email={email}
              uid={uid} user={user} candidate={candidate}
            />}
            {member && project.candidates.map((c, i) => <JoinCard
              project={project} id={id} email={email}
              uid={uid} user={user} key={i} candidate={c} member={member}
            />)}
          </Collapse>
          <ProjectContent project={project} id={id} member={member} />
          <ProjectTags project={project} id={id} tags={tags && tags.list} member={member} />
          <ProjectTeam project={project} id={id} member={member} />
          {member && <ProjectMenu
            project={project} id={id} email={email} user={user} uid={uid}
          />}
        </Box>}
        {tabs === 1 && member && sprints && <Box sx={{ p: 2 }}>
          <SprintCard setSid={setSid} sprints={sorted} sprint={sprint} id={id} />
          <ProjectTasks project={project} sprint={sprint} id={id} />
        </Box>}
      </div> : <p>loading...</p>}
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => ({
  project: state.firestore.data[props.id],
  sprints: state.firestore.ordered[props.id + 'sprints'],
  tags: state.firestore.data.tags,
  email: state.firebase.auth.email,
  uid: state.firebase.auth.uid,
  user: state.firestore.data[state.firebase.auth.uid],
});

const mapDispatchToProps = (dispatch) => ({
  createTask: (data, sprint, project) => dispatch(createTask(data, sprint, project)),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => props.project && props.project.emails.includes(props.email) ? [
    { storeAs: props.id, collection: 'projects', doc: props.id },
    {
      storeAs: props.id + 'sprints', collection: 'projects', doc: props.id,
      subcollections: [{ collection: 'sprints' }], orderBy: ['key', 'desc'],
    },
    { storeAs: 'tags', collection: 'tags', doc: 'tags' },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ] : [
    { storeAs: props.id, collection: 'projects', doc: props.id },
    { storeAs: props.uid, collection: 'users', doc: props.uid },
  ]),
)(ProjectView));
