import React from 'react';
import { connect } from 'react-redux';
import { updateTeam } from 'store/projectsActions';
import { Card, CardContent, Button } from '@mui/material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const JoinCard = ({ updateTeam, team, id }) => (
  <Card
    sx={{ bgcolor: 'secondary.light', mb: 2 }}
    variant='outlined'
  >
    <CardContent>
      <Formik
        initialValues={{
          email: '',
          message: '',
        }}
        onSubmit={(values) => {
          updateTeam({ candidates: [...team.candidates, { ...values }] }, id);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextInput
              onChange={handleChange}
              value={values.email}
              label='Email'
              name='email'
              type='email'
              size='small'
              autoFocus
              required
            />
            <TextInput
              onChange={handleChange}
              value={values.message}
              label='Message'
              name='message'
              type='text'
              size='small'
              multiline
              rows={3}
            />
            <Button
              type='submit'
              variant='outlined'
              size='small'
            >
              Join Project
            </Button>
          </form>
        )}
      </Formik>
    </CardContent>
  </Card>
);

const mapDispatchToProps = (dispatch) => ({
  updateTeam: (data, project) => dispatch(updateTeam(data, project)),
});

export default connect(null, mapDispatchToProps)
  (JoinCard);
