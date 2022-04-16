import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from 'store/usersActions';
import { Card, CardHeader, Box, Avatar } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { PersonOutline, Edit, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProfileContent = ({ updateProfile, profile, id, owner }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);

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
          <PersonOutline />
        </Avatar>}
        action={<>
          {owner && !edit && <IconButton onClick={() => {
            setEdit(true); setExpand(true);
          }}>
            <Edit />
          </IconButton>}
          {owner && edit && <IconButton type='submit' form='edit'>
            <Check />
          </IconButton>}
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <Box sx={{ p: 2 }}>
          {!edit && <>
            <Typography variant='h6'>
              {profile.firstname} {profile.lastname}
            </Typography>
            <Typography variant='subtitle1'>
              {profile.description}
            </Typography>
          </>}
          {edit && <Formik
            initialValues={{
              email: profile.email,
              description: profile.description,
            }}
            onSubmit={(values) => { updateProfile(values, id); setEdit(false); }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id='edit' autoComplete='off'>
                <TextInput
                  onChange={handleChange}
                  value={values.email}
                  label='Email'
                  name='email'
                  type='email'
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
  updateProfile: (data, id) => dispatch(updateProfile(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProfileContent);
