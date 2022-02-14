import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { Card, CardHeader, CardContent, Collapse } from '@mui/material';
import { Typography, IconButton, Avatar } from '@mui/material';
import { FolderOpen, ExpandMore, Edit, Check } from '@mui/icons-material';
import { red, green, blue, orange, indigo } from '@mui/material/colors';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProjectContent = ({ updateProject, project, id }) => {
  const colors = [red, green, blue, orange, indigo];
  const number = project.name && project.name.charCodeAt(0) % 5;
  let avatarColor = project.name ? colors[number][700] : blue[700];
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(project.new);
  useEffect(() => { project.new && updateProject({ new: false }, id) });

  return (
    <Card
      sx={{ bgcolor: 'secondary.light' }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='h5'>
          {project.name}
        </Typography>}
        avatar={<Avatar sx={{ bgcolor: avatarColor }}>
          <FolderOpen />
        </Avatar>}
        action={<>
          {!edit && <IconButton onClick={() => {
            setEdit(true);
            setExpand(true);
          }}>
            <Edit />
          </IconButton>}
          {edit && <IconButton type='submit' form='edit'>
            <Check />
          </IconButton>}
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <CardContent>
          {!edit && <Typography>
            {project.description}
          </Typography>}
          {edit && <Formik
            initialValues={{
              name: project.name,
              description: project.description,
            }}
            onSubmit={(values) => {
              updateProject(values, id);
              setEdit(false);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id='edit' autoComplete='off'>
                <TextInput
                  onChange={handleChange}
                  value={values.name}
                  label='Name'
                  name='name'
                  type='text'
                  size='small'
                />
                <TextInput
                  onChange={handleChange}
                  value={values.description}
                  label='Description'
                  name='description'
                  type='text'
                  size='small'
                  multiline
                  rows={7}
                />
              </form>
            )}
          </Formik>}
        </CardContent>
      </Collapse>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, id) => dispatch(updateProject(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProjectContent);
