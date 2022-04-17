import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeProject } from 'store/projectsActions';
import { updateProject } from 'store/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Box, Collapse, Button } from '@mui/material';
import { Settings } from '@mui/icons-material';

const ProjectMenu = ({ updateProject, removeProject, project, id, email }) => {
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
          {project.emails && project.emails.length > 1 && <Button
            onClick={() => {
              updateProject({
                emails: project.emails.filter(e => e !== email),
                members: project.members.filter(m => m.email !== email),
              }, id);
            }}
            variant='outlined' size='small' color='error'
          >
            Leave Project
          </Button>}
          {project.emails && project.emails.length <= 1 && <Button
            onClick={() => { removeProject(id); navigate('/board'); }}
            variant='outlined' size='small' color='error'
          >
            Delete Project
          </Button>}
        </Box>
      </Collapse>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, id) => dispatch(updateProject(data, id)),
  removeProject: (id) => dispatch(removeProject(id)),
});

export default connect(null, mapDispatchToProps)
  (ProjectMenu);
