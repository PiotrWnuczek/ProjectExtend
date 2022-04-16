import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { Box, Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { Groups, ExpandMore, Edit, Check, Person } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProjectTeam = ({ updateProject, id, project, member }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='h6'>
          Team
        </Typography>}
        avatar={<Avatar>
          <Groups />
        </Avatar>}
        action={<>
          {member && !edit && <IconButton onClick={() => { setEdit(true); setExpand(true); }}>
            <Edit />
          </IconButton>}
          {member && edit && <IconButton type='submit' form='edit'>
            <Check />
          </IconButton>}
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <CardContent>
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
        </CardContent>
      </Collapse>
    </Card >
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, project) => dispatch(updateProject(data, project)),
});

export default connect(null, mapDispatchToProps)
  (ProjectTeam);
