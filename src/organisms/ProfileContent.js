import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from 'store/usersActions';
import { Card, Typography, IconButton } from '@mui/material';
import { Source, Check } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProfileContent = ({ updateProfile, profile, id, owner }) => {
  const [name, setName] = useState(false);
  const [description, setDescription] = useState(false);

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
      {(!owner || !name) && <Typography
        sx={{ cursor: owner && 'pointer' }}
        onClick={() => setName(true)}
        variant='h6'
      >
        {profile.firstname + ' ' + profile.lastname}
      </Typography>}
      {(owner && name) && <Formik
        initialValues={{ name: profile.firstname + ' ' + profile.lastname }}
        onSubmit={(values) => {
          values.name && values.name !== profile.firstname + ' ' + profile.firstname &&
            updateProfile({
              firstname: values.name.split(' ')[0], lastname: values.name.split(' ')[1],
            }, id);
          setName(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ mb: 0, mt: 1 }}
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
      {(!owner || !description) && <Box
        sx={{ cursor: owner && 'pointer', fontSize: '90%' }}
        onClick={() => setDescription(true)}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {profile.description}
        </ReactMarkdown>
      </Box>}
      {(owner && description) && <Formik
        initialValues={{ description: profile.description }}
        onSubmit={(values) => {
          values.description && values.description !== profile.description &&
            updateProfile(values, id);
          setDescription(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ mb: 0, my: 1 }}
              onChange={handleChange}
              value={values.description}
              label='Description'
              name='description'
              type='text'
              size='small'
              multiline
              rows={3}
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
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data, id) => dispatch(updateProfile(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProfileContent);
