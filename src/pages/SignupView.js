import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signupUser } from 'store/usersActions';
import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import TextInput from 'atoms/TextInput';

const SignupView = ({ signupUser, error, auth }) => {
  const [mistake, setMistake] = useState(false);

  return (auth.uid ?
    <Navigate to='/profile' /> :
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
            color='secondary'
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
