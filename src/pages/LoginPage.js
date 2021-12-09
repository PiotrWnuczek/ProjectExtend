import React from 'react';
import { connect } from 'react-redux';
import { signIn } from 'store/profileActions';
import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { styled } from '@mui/system';
import TextInput from 'atoms/TextInput';
import startGraphic from 'assets/startGraphic.png';

const StyledWrapper = styled('div')({
  backgroundImage: `url(${startGraphic})`,
});

const LoginPage = ({ signIn, error, auth }) => (auth.uid ?
  <Navigate to='/profile' /> :
  <StyledWrapper>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        signIn(values);
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
            color='secondary'
            variant='contained'
            endIcon={<KeyboardArrowRight />}
          >
            Sign In
          </Button>
          {error && <p>{error}</p>}
        </form>
      )}
    </Formik>
  </StyledWrapper>
);

const mapStateToProps = (state) => ({
  error: state.profile.error,
  auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (creds) => dispatch(signIn(creds)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (LoginPage);
