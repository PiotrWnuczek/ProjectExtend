import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProject, removeProject } from 'store/projectsActions';
import { updateProfile } from 'store/usersActions';
import { useNavigate } from 'react-router-dom';
import { Box, Collapse, Button } from '@mui/material';
import { Settings } from '@mui/icons-material';
import AlertDialog from 'atoms/AlertDialog';

const ProjectMenu = (
  { updateProject, removeProject, updateProfile, project, id, email, uid, user }
) => {
  const [options, setOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => setOptions(!options)}
        endIcon={<Settings />}
        variant='outlined'
        size='small'
      >
        Options
      </Button>
      <Collapse in={options} timeout='auto'>
        <Box sx={{ py: 1 }}>
          {project.emails && project.emails.length > 1 && <AlertDialog
            clickAction={() => {
              updateProject({
                emails: project.emails.filter(e => e !== email),
                members: project.members.filter(m => m.email !== email),
              }, id);
              updateProfile({ projects: user.projects.filter(p => p !== id) }, uid);
              navigate('/board');
            }}
            name='Leave Project'
            content='Do you want to leave this project?'
          />}
          {project.emails && project.emails.length <= 1 && <AlertDialog
            clickAction={() => {
              removeProject(id);
              navigate('/board');
            }}
            name='Delete Project'
            content='Do you want to permanently delete this project?'
          />}
        </Box>
      </Collapse>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, id) => dispatch(updateProject(data, id)),
  removeProject: (id) => dispatch(removeProject(id)),
  updateProfile: (data, id) => dispatch(updateProfile(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProjectMenu);
