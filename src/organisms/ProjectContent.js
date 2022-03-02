import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { FolderOpen, ExpandMore, Edit, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProjectContent = ({ updateProject, project, id, member }) => {
  const [expand, setExpand] = useState(true);
  const [edit, setEdit] = useState(!project.key);
  useEffect(() => { !project.key && updateProject({ key: id }, id) });

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='h6'>
          {project.name}
        </Typography>}
        avatar={<Avatar>
          <FolderOpen />
        </Avatar>}
        action={<>
          {member && !edit && <IconButton onClick={() => {
            setEdit(true); setExpand(true);
          }}>
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
          {!edit && <Typography>
            {project.description}
          </Typography>}
          {edit && <Formik
            initialValues={{
              name: project.name,
              description: project.description,
            }}
            onSubmit={(values) => { updateProject(values, id); setEdit(false); }}
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
