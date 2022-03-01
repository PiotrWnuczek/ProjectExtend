import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeProject } from 'store/projectsActions';
import { updateProject, updateTeam } from 'store/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Box, Collapse, Button } from '@mui/material';
import { Settings } from '@mui/icons-material';

const ProjectMenu = ({ updateProject, updateTeam, removeProject, pro, id, team, email }) => {
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
          {pro.emails && pro.emails.length > 1 && <Button
            onClick={() => {
              updateProject({ emails: pro.emails.filter(e => e !== email) }, id);
              updateTeam({ members: team.members.filter(m => m.email !== email) }, id);
            }}
            variant='outlined'
            size='small'
            color='error'
          >
            Leave Project
          </Button>}
          {pro.emails && pro.emails.length <= 1 && <Button
            onClick={() => { removeProject(id); navigate('/board'); }}
            variant='outlined'
            size='small'
            color='error'
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
  updateTeam: (data, project) => dispatch(updateTeam(data, project)),
  removeProject: (id) => dispatch(removeProject(id)),
});

export default connect(null, mapDispatchToProps)
  (ProjectMenu);
