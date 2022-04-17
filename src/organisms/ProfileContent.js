import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from 'store/usersActions';
import { Card, Typography } from '@mui/material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';
import { Source } from '@mui/icons-material';
import { Box } from '@mui/system';

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
        sx={{ cursor: 'pointer' }}
        onClick={() => setName(true)}
        variant='h6'
      >
        {profile.firstname}
      </Typography>}
      {(owner && name) && <Formik
        initialValues={{ firstname: profile.firstname }}
        onSubmit={(values) => {
          values.firstname !== profile.firstname && updateProfile(values, id);
          setName(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ mb: 0, mt: 1 }}
              onChange={handleChange}
              value={values.firstname}
              label='Firstname'
              name='firstname'
              type='text'
              size='small'
              autoFocus
            />
          </form>
        )}
      </Formik>}
      {(!owner || !description) && <Typography
        sx={{ cursor: 'pointer' }}
        onClick={() => setDescription(true)}
        variant='subtitle1'
      >
        {profile.description}
      </Typography>}
      {(owner && description) && <Formik
        initialValues={{ description: profile.description }}
        onSubmit={(values) => {
          values.description !== profile.description && updateProfile(values, id);
          setDescription(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} autoComplete='off'>
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
