import React from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { updateProfile } from 'store/usersActions';
import { Typography, Button } from '@mui/material';
import { Box, Card } from '@mui/material';

const JoinCard = (
  { updateProject, updateProfile, project, id, email, uid, user, candidate, member }
) => (
  <Card
    sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 2 }}
    variant='outlined'
  >
    <Box sx={{ p: 2, display: 'flex' }}>
      {!candidate && !member && <Typography>
        Send request to join:
        <Button
          sx={{ ml: 1 }}
          onClick={() => {
            updateProject({
              candidates: [...project.candidates, {
                email, uid,
                firstname: user.firstname,
                lastname: user.lastname,
                nickname: user.firstname[0] + user.lastname[0],
              }],
            }, id);
            updateProfile({ projects: [...user.projects, id] }, uid);
          }}
          size='small'
          disabled={user && user.projects.length >= user.limit}
        >
          {user && user.projects.length < user.limit ? 'Send Request' : 'Used limit'}
        </Button>
      </Typography>}
      {candidate && !member && <Typography>
        Request to join sent, you can also send email:
        <Button
          sx={{ ml: 1 }}
          onClick={() =>
            window.location = 'mailto:' + project.emails[0] +
            '?subject=PROJECT EXTEND ' + project.name + ' request to join'
          }
          size='small'
        >
          Send Email
        </Button>
      </Typography>}
      {candidate && member && <Typography>
        Accept or delete request to join:
        <Button
          sx={{ ml: 1 }}
          onClick={() => updateProject({
            candidates: project.candidates.filter(c => c.email !== candidate.email),
            members: [...project.members, {
              email: candidate.email,
              uid: candidate.uid,
              firstname: candidate.firstname,
              lastname: candidate.lastname,
              nickname: candidate.nickname,
            }],
            emails: [...project.emails, candidate.email],
          }, id)}
          size='small'
        >
          Accept
        </Button>
        <Button
          sx={{ ml: 1 }}
          onClick={() => {
            updateProject({
              candidates: project.candidates.filter(c => c.email !== candidate.email),
            }, id);
            updateProfile({ projects: user.projects.filter(p => p.id !== id) }, uid);
          }}
          size='small'
        >
          Delete
        </Button>
      </Typography>}
    </Box>
  </Card>
);

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, id) => dispatch(updateProject(data, id)),
  updateProfile: (data, id) => dispatch(updateProfile(data, id)),
});

export default connect(null, mapDispatchToProps)
  (JoinCard);
