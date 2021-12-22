import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signinUser } from 'store/usersActions';
import { Formik } from 'formik';
import { Button, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import FrontLayout from 'organisms/FrontLayout';
import TextInput from 'atoms/TextInput';
import Logo from 'assets/logo.png';

const SigninView = ({ signinUser, error, auth }) => (auth.uid ?
  <Navigate to='/profile' /> :
  <FrontLayout>
    <img src={Logo} alt='Logo' />
    <Typography variant='h4' m={2}>
      Sign In
    </Typography>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        signinUser(values);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} >
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
          <Button
            type='submit'
            variant='contained'
            endIcon={<KeyboardArrowRight />}
          >
            Sign In
          </Button>
          {error && <p>{error}</p>}
        </form>
      )}
    </Formik>
  </FrontLayout>
);

const mapStateToProps = (state) => ({
  error: state.users.error,
  auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signinUser: (creds) => dispatch(signinUser(creds)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (SigninView);
