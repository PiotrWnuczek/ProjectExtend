import React from 'react';
import { connect } from 'react-redux';
import { signoutUser } from 'store/usersActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem } from '@mui/material';
import { ListItemText, ListItemIcon } from '@mui/material';
import { Person, Logout } from '@mui/icons-material';
import { Dashboard, People } from '@mui/icons-material';
import { styled } from '@mui/system';
import Logo from 'assets/logo.png';

const StyledDrawer = styled(Drawer)({
  width: '10rem',
  '& .MuiDrawer-paper': {
    justifyContent: 'space-between',
    width: '10rem',
  },
});

const StyledLogo = styled('img')({
  marginBottom: '1rem',
  width: '100%',
});

const SideBar = ({ signoutUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Board', icon: <Dashboard />, path: '/board' },
    { text: 'People', icon: <People />, path: '/people' },
  ];

  return (
    <StyledDrawer variant='permanent' anchor='left'>
      <List>
        <ListItem>
          <StyledLogo src={Logo} alt='Logo' />
        </ListItem>
        {menu.map(item =>
          <ListItem
            sx={{ backgroundColor: location.pathname === item.path && '#f4f4f4' }}
            onClick={() => navigate(item.path)}
            key={item.text}
            button
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )}
      </List>
      <List>
        <ListItem
          onClick={signoutUser}
          button
        >
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary='SignOut' />
        </ListItem>
      </List>
    </StyledDrawer>
  )
};

const mapDispatchToPorps = (dispatch) => ({
  signoutUser: () => dispatch(signoutUser()),
});

export default connect(null, mapDispatchToPorps)
  (SideBar);
