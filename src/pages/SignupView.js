import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signupUser } from 'store/usersActions';
import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import FrontLayout from 'organisms/FrontLayout';
import TextInput from 'atoms/TextInput';

const SignupView = ({ signupUser, error, auth }) => {
  const [mistake, setMistake] = useState(false);

  return (auth.uid ?
    <Navigate to='/profile' /> :
    <FrontLayout>
      <Typography variant='h4' gutterBottom>
        Sign Up
      </Typography>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirm: '',
        }}
        onSubmit={(values) => {
          if (values.password === values.confirm) {
            signupUser({
              name: values.name,
              email: values.email,
              password: values.password,
            });
          } else { setMistake(true) }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextInput
              onChange={handleChange}
              value={values.name}
              name='name'
              type='text'
            />
            <TextInput
              onChange={handleChange}
              value={values.email}
              name='email'
              type='email'
            />
            <TextInput
              onChange={handleChange}
              value={values.password}
              name='password'
              type='password'
            />
            <TextInput
              onChange={handleChange}
              value={values.confirm}
              name='confirm'
              type='password'
            />
            <Button
              type='submit'
              variant='contained'
              endIcon={<KeyboardArrowRight />}
            >
              Sign Up
            </Button>
            {error && <p>{error}</p>}
            {mistake && <p>Passowrds are not identical</p>}
          </form>
        )}
      </Formik>
    </FrontLayout>
  )
};

const mapStateToProps = (state) => ({
  error: state.users.error,
  auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signupUser: (user) => dispatch(signupUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (SignupView);
