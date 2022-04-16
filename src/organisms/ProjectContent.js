import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { Card, CardHeader, Box, Avatar } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { FolderOpen, Edit, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProjectContent = ({ updateProject, project, id, member }) => {
  const [expand, setExpand] = useState(!project.key);
  const [edit, setEdit] = useState(!project.key);
  useEffect(() => { !project.key && updateProject({ key: id }, id) });

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='button'>
          Content
        </Typography>}
        avatar={<Avatar
          sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'info.light' } }}
          onClick={() => setExpand(!expand)}
        >
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
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <Box sx={{ p: 2 }}>
          {!edit && <>
            <Typography variant='h6'>
              {project.name}
            </Typography>
            <Typography variant='subtitle1'>
              {project.description}
            </Typography>
          </>}
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
                  rows={3}
                />
              </form>
            )}
          </Formik>}
        </Box>
      </Collapse>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, id) => dispatch(updateProject(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProjectContent);
