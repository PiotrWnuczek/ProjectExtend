import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, Navigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import SigninView from 'pages/SigninView';
import SignupView from 'pages/SignupView';
import BoardView from 'pages/BoardView';
import PeopleView from 'pages/PeopleView';
import ProfileView from 'pages/ProfileView';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const App = () => {
  const theme = createTheme({
    typography: { fontFamily: 'Lato' }
  });

  const auth = useSelector(state => state.firebase.auth);
  const access = isLoaded(auth) && !isEmpty(auth);
  const [sidebar, setSidebar] = useState(false);

  return (
    <AppContext.Provider value={[sidebar, setSidebar]}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<SigninView />} />
            <Route path='/signup' element={<SignupView />} />
            <Route path='/board' element={access ? <BoardView /> : <Navigate to='/signin' />} />
            <Route path='/people' element={access ? <PeopleView /> : <Navigate to='/signin' />} />
            <Route path='/profile' element={access ? <ProfileView /> : <Navigate to='/signin' />} />
            <Route exact path='/' element={<Navigate to='/profile' />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  )
};

export default App;
