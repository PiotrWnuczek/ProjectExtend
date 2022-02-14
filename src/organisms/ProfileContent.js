import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from 'store/usersActions';
import { Card, CardHeader, CardContent, Collapse } from '@mui/material';
import { Typography, IconButton, Avatar } from '@mui/material';
import { PersonOutline, ExpandMore, Edit, Check } from '@mui/icons-material';
import { red, green, blue, orange, indigo } from '@mui/material/colors';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProfileContent = ({ updateProfile, profile, id }) => {
  const colors = [red, green, blue, orange, indigo];
  const number = profile.firstname && profile.firstname.charCodeAt(0) % 5;
  let avatarColor = profile.firstname ? colors[number][700] : blue[700];
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='h5'>
          {profile.email}
        </Typography>}
        avatar={<Avatar sx={{ bgcolor: avatarColor }}>
          <PersonOutline />
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
      <Collapse in={expand} timeout='auto'>
        <CardContent>
          {!edit && <Typography>
            {profile.description}
          </Typography>}
          {edit && <Formik
            initialValues={{
              email: profile.email,
              description: profile.description,
            }}
            onSubmit={(values) => {
              updateProfile(values, id);
              setEdit(false);
            }}
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
  updateProfile: (data, id) => dispatch(updateProfile(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProfileContent);
