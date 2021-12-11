import React from 'react';
import { connect } from 'react-redux';
import { signoutUser } from 'store/usersActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem } from '@mui/material';
import { ListItemText, ListItemIcon } from '@mui/material';
import { Person, Logout } from '@mui/icons-material';
import { Dashboard, People } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledDrawer = styled(Drawer)({
  width: '10rem',
  '& .MuiDrawer-paper': {
    justifyContent: 'space-between',
    background: '#333333',
    color: '#dddddd',
    width: '10rem',
  },
});

const SideBar = ({ signoutUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { text: 'Profile', icon: <Person sx={{ color: '#dddddd' }} />, path: '/profile' },
    { text: 'Board', icon: <Dashboard sx={{ color: '#dddddd' }} />, path: '/board' },
    { text: 'People', icon: <People sx={{ color: '#dddddd' }} />, path: '/people' },
  ];

  return (
    <StyledDrawer variant='permanent' anchor='left'>
      <List>
        {menu.map(item =>
          <ListItem
            sx={{ backgroundColor: location.pathname === item.path && '#444444' }}
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
          <ListItemIcon><Logout sx={{ color: '#dddddd' }} /></ListItemIcon>
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
