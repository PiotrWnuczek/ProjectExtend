import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { Box, Card, Typography } from '@mui/material';
import { List, ListItem } from '@mui/material';
import { Groups, Person } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProjectTeam = ({ updateProject, id, project, member }) => {
  const [edit, setEdit] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2, mb: 2 }}
      variant='outlined'
    >
      <Box sx={{ display: 'flex', pb: 2 }} >
        <Groups sx={{ color: 'primary.main', pr: 1 }} />
        <Typography variant='button'>
          Team
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {project.members.map(mb =>
          <ListItem sx={{ p: 0 }} key={mb.uid}>
            <Person sx={{ color: 'info.light', mr: 1 }} />
            {(!member || edit !== mb.uid) && <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => setEdit(mb.uid)}
            >
              {mb.firstname} {mb.lastname} {mb.nickname}
            </Typography>}
            {(member && edit === mb.uid) && <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>
                {mb.firstname} {mb.lastname}
              </Typography>
              <Formik
                initialValues={{ nickname: mb.nickname }}
                onSubmit={(values) => {
                  values.nickname !== mb.nickname && updateProject({
                    members: project.members.map(m => m.email === mb.email ?
                      { ...m, nickname: values.nickname } : m)
                  }, id);
                  setEdit(false);
                }}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form onBlur={handleSubmit} autoComplete='off'>
                    <TextInput
                      sx={{ m: 0 }}
                      onChange={handleChange}
                      value={values.nickname}
                      label='Nickname'
                      name='nickname'
                      type='text'
                      size='small'
                      autoFocus
                    />
                  </form>
                )}
              </Formik>
            </Box>}

          </ListItem>
        )}
      </List>
    </Card >
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, project) => dispatch(updateProject(data, project)),
});

export default connect(null, mapDispatchToProps)
  (ProjectTeam);
