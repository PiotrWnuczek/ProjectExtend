import React from 'react';
import { connect } from 'react-redux';
import { signoutUser } from 'store/usersActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Typography, List } from '@mui/material';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { PersonOutline, Login, Logout } from '@mui/icons-material';
import { Dashboard } from '@mui/icons-material';

const SideBar = ({ sideWidth, auth, signoutUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenu = [
    {
      text: 'Profile',
      icon: <PersonOutline color='secondary' />,
      path: '/profile',
    },
    {
      text: 'Board',
      icon: <Dashboard color='secondary' />,
      path: '/board',
    },
    {
      text: 'People',
      icon: <Dashboard color='secondary' />,
      path: '/people',
    },
  ];
  const authMenu = [
    {
      text: 'Sign In',
      icon: <Login color='secondary' />,
      path: '/signin',
    },
    {
      text: 'Sign Up',
      icon: <Login color='secondary' />,
      path: '/signup',
    },
  ];

  return (
    <Drawer
      sx={{ width: sideWidth, '& .MuiDrawer-paper': { width: sideWidth } }}
      variant='permanent'
      anchor='left'
    >
      <Typography
        sx={{ p: 2, cursor: 'pointer' }}
        variant='h5'
        onClick={() => navigate('/profile')}
      >
        Material App
      </Typography>
      {auth.uid && <div>
        <List>
          {mainMenu.map(item =>
            <ListItem button
              sx={{ backgroundColor: location.pathname === item.path && '#f4f4f4' }}
              onClick={() => navigate(item.path)}
              key={item.text}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          )}
        </List>
        <List>
          <ListItem button
            sx={{ marginTop: '50vh' }}
            onClick={signoutUser}
          >
            <ListItemIcon><Logout color='secondary' /></ListItemIcon>
            <ListItemText primary='Sign Out' />
          </ListItem>
        </List>
      </div>}
      {!auth.uid && <List>
        {authMenu.map(item =>
          <ListItem button
            sx={{ backgroundColor: location.pathname === item.path && '#f4f4f4' }}
            onClick={() => navigate(item.path)}
            key={item.text}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )}
      </List>}
    </Drawer>
  )
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

const mapDispatchToPorps = (dispatch) => ({
  signoutUser: () => dispatch(signoutUser()),
});

export default connect(mapStateToProps, mapDispatchToPorps)
  (SideBar);
