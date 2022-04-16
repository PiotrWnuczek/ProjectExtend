import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { Box, Card, CardHeader, Avatar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { Groups, Edit, Check, Person } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProjectTeam = ({ updateProject, id, project, member }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='button'>
          Team
        </Typography>}
        avatar={<Avatar
          sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'info.light' } }}
          onClick={() => setExpand(!expand)}
        >
          <Groups />
        </Avatar>}
        action={<>
          {member && !edit && <IconButton onClick={() => { setEdit(true); setExpand(true); }}>
            <Edit />
          </IconButton>}
          {member && edit && <IconButton type='submit' form='edit'>
            <Check />
          </IconButton>}
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <Box sx={{ p: 2 }}>
          <List sx={{ p: 0 }}>
            {project.members.map(member =>
              <ListItem sx={{ p: 0 }} key={member.uid}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary={<>
                    {!edit && <Typography>
                      {member.firstname} {member.lastname} | {member.email} : {member.nickname}
                    </Typography>}
                    {edit && <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>
                        {member.firstname} {member.lastname} | {member.email} :
                      </Typography>
                      <Formik
                        initialValues={{ nickname: member.nickname }}
                        onSubmit={(values) => {
                          updateProject({
                            members: project.members.map(m => m.email === member.email ?
                              { ...m, nickname: values.nickname } : m)
                          }, id);
                          setEdit(false);
                        }}
                      >
                        {({ values, handleChange, handleSubmit }) => (
                          <form onSubmit={handleSubmit} id='edit' autoComplete='off'>
                            <TextInput
                              sx={{ m: 0 }}
                              onChange={handleChange}
                              value={values.nickname}
                              label='Nickname'
                              name='nickname'
                              type='text'
                              size='small'
                            />
                          </form>
                        )}
                      </Formik>
                    </Box>}
                  </>}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Collapse>
    </Card >
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, project) => dispatch(updateProject(data, project)),
});

export default connect(null, mapDispatchToProps)
  (ProjectTeam);
