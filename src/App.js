import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, Navigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import PrivateRoute from 'atoms/PrivateRoute';
import ProfilePage from 'pages/ProfilePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

const theme = createTheme({
  typography: {
    fontFamily: 'Lato',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Navigate to='/profile' />} />
        <Route
          path='/profile'
          element={<PrivateRoute path='/profile' element={<ProfilePage />} />}
        />
        <Route
          path='/signin'
          element={<LoginPage />}
        />
        <Route
          path='/signup'
          element={<RegisterPage />}
        />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
