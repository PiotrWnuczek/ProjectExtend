import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, Navigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { grey, blueGrey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import AppProvider from 'assets/useApp';
import AboutView from 'about/AboutView';
import SigninView from 'pages/SigninView';
import SignupView from 'pages/SignupView';
import BoardView from 'pages/BoardView';
import SpaceView from 'pages/SpaceView';
import ProfileView from 'pages/ProfileView';
import ProjectView from 'pages/ProjectView';

const App = () => {
  const auth = useSelector(state => state.firebase.auth);
  const access = isLoaded(auth) && !isEmpty(auth);
  const theme = createTheme({
    typography: { fontFamily: 'Lato' },
    palette: {
      secondary: { light: grey[50], main: grey[100], dark: blueGrey[50] },
      info: { light: grey[600], main: grey[700], dark: grey[800] },
    },
  });

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/about' element={<AboutView />} />
            <Route path='/signin' element={<SigninView />} />
            <Route path='/signup' element={<SignupView />} />
            <Route path='/board' element={access ? <BoardView /> : <Navigate to='/about' />} />
            <Route path='/space' element={access ? <SpaceView /> : <Navigate to='/about' />} />
            <Route path='/project/:id' element={access ? <ProjectView /> : <Navigate to='/about' />} />
            <Route path='/profile/:id' element={access ? <ProfileView /> : <Navigate to='/about' />} />
            <Route exact path='/' element={<Navigate to='/board' />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  )
};

export default App;
