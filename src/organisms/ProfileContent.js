import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from 'store/usersActions';
import { Box, Typography, Button, IconButton, Avatar } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { PersonOutline, ExpandMore, Edit, Check } from '@mui/icons-material';
import { red, green, blue, orange, indigo } from '@mui/material/colors';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const ProfileContent = ({ updateProfile, profile, id }) => {
  const colors = [red, green, blue, orange, indigo];
  const number = profile.firstname.charCodeAt(0) % 5;
  let avatarColor = colors[number][700];
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(false);
  const [desc, setDesc] = useState(false);

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: avatarColor, mr: 2 }}>
          <PersonOutline />
        </Avatar>
        {!name && <Typography variant='h5'>
          {profile.email}
        </Typography>}
        {name && <Formik
          initialValues={{ email: profile.email }}
          onSubmit={(values) => { updateProfile(values, id); setName(false); }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} id='name' autoComplete='off'>
              <TextInput
                sx={{ m: 0 }}
                onChange={handleChange}
                value={values.email}
                label='Email'
                name='email'
                type='email'
                size='small'
              />
            </form>
          )}
        </Formik>}
        {!name && <IconButton
          sx={{ ml: 1 }}
          onClick={() => setName(true)}
          size='small'
        >
          <Edit />
        </IconButton>}
        {name && <IconButton
          sx={{ ml: 1 }}
          type='submit'
          form='name'
          size='small'
        >
          <Check />
        </IconButton>}
      </Box>
      <Accordion
        sx={{ bgcolor: 'inherit', mb: 2, '&:before': { display: 'none' } }}
        expanded={open}
        variant='outlined'
      >
        <AccordionSummary
          sx={{ pointerEvents: 'none' }}
          expandIcon={<ExpandMore
            sx={{ pointerEvents: 'auto' }}
            onClick={() => setOpen(!open)}
          />}
        >
          <Typography
            sx={{ pointerEvents: 'auto' }}
            onClick={() => setOpen(!open)}
            variant='h6'
          >
            Content
          </Typography>
          {!desc && <Button
            sx={{ pointerEvents: 'auto', mx: 2 }}
            endIcon={<Edit />}
            onClick={() => setDesc(true)}
            variant='outlined'
            size='small'
          >
            Edit
          </Button>}
          {desc && <Button
            sx={{ pointerEvents: 'auto', mx: 2 }}
            endIcon={<Check />}
            type='submit'
            form='form'
            variant='outlined'
            size='small'
          >
            Save
          </Button>}
        </AccordionSummary>
        <AccordionDetails>
          {!desc && <Typography>
            {profile.description}
          </Typography>}
          {desc && <Formik
            initialValues={{ description: profile.description }}
            onSubmit={(values) => { updateProfile(values, id); setDesc(false); }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id='form' autoComplete='off'>
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
        </AccordionDetails>
      </Accordion>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data, id) => dispatch(updateProfile(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProfileContent);
