import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import Profile from 'pages/Profile';
import SignIn from 'access/SignIn';
import SignUp from 'access/SignUp';

const theme = createTheme({
  typography: {
    fontFamily: 'Lato',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/profile' component={Profile} />
        <Route exact path='/' render={() => <Redirect to='/profile' />} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
