import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { Card, Typography, IconButton } from '@mui/material';
import { FormControlLabel, Switch } from '@mui/material';
import { Source, Check } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProjectContent = ({ updateProject, project, id, member }) => {
  const [name, setName] = useState(!project.key);
  const [description, setDescription] = useState(false);
  useEffect(() => { !project.key && updateProject({ key: id }, id) });

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2, mb: 2 }}
      variant='outlined'
    >
      <Box sx={{ display: 'flex', pb: 2 }} >
        <Source sx={{ color: 'primary.main', pr: 1 }} />
        <Typography variant='button'>
          Content
        </Typography>
      </Box>
      {(!member || !name) && <Typography
        sx={{ cursor: member && 'pointer' }}
        onClick={() => setName(true)}
        variant='h6'
      >
        {project.name}
      </Typography>}
      {(member && name) && <Formik
        initialValues={{ name: project.name }}
        onSubmit={(values) => {
          values.name && values.name !== project.name &&
            updateProject(values, id);
          setName(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ my: 0 }}
              onChange={handleChange}
              value={values.name}
              label='Name'
              name='name'
              type='text'
              size='small'
              autoFocus
              InputProps={{
                endAdornment: <IconButton
                  sx={{ mx: -1 }}
                  type='submit'
                  size='small'
                >
                  <Check />
                </IconButton>
              }}
            />
          </form>
        )}
      </Formik>}
      {(!member || !description) && <Box
        sx={{ cursor: member && 'pointer', fontSize: '90%' }}
        onClick={() => setDescription(true)}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.description}
        </ReactMarkdown>
      </Box>}
      {(member && description) && <Formik
        initialValues={{ description: project.description }}
        onSubmit={(values) => {
          values.description && values.description !== project.description &&
            updateProject(values, id);
          setDescription(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ mt: 1, mb: 0 }}
              onChange={handleChange}
              value={values.description}
              label='Description (MarkDown)'
              name='description'
              type='text'
              size='small'
              multiline
              minRows={4}
              autoFocus
              InputProps={{
                endAdornment: <IconButton
                  sx={{ mx: -1, mb: -0.5, mt: 'auto' }}
                  type='submit'
                  size='small'
                >
                  <Check />
                </IconButton>
              }}
            />
          </form>
        )}
      </Formik>}
      {member && <FormControlLabel
        control={<Switch checked={project.public} />}
        onChange={(e, value) => updateProject({ public: value }, id)}
        label='public'
      />}
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, id) => dispatch(updateProject(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProjectContent);
