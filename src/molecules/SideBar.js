import React from 'react';
import { connect } from 'react-redux';
import { signoutUser } from 'store/usersActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Avatar, List, ListItem } from '@mui/material';
import { ListItemText, ListItemAvatar } from '@mui/material';
import { Person, Dashboard, People, Logout } from '@mui/icons-material';
import { styled } from '@mui/system';
import Logo from 'assets/logo.png';

const StyledLogo = styled('img')({
  maxWidth: 120,
});

const SideBar = ({ signoutUser, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Board', icon: <Dashboard />, path: '/board' },
    { text: 'People', icon: <People />, path: '/people' },
  ];

  return (
    <Drawer {...props}>
      <List>
        <ListItem sx={{ mb: 12 }}>
          <StyledLogo src={Logo} alt='Logo' />
        </ListItem>
        {menu.map(item =>
          <ListItem
            sx={{ textTransform: 'uppercase' }}
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            button
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {item.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={item.text} />
          </ListItem>
        )}
      </List>
      <List>
        <ListItem
          sx={{ textTransform: 'uppercase' }}
          onClick={signoutUser}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Logout />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary='Sign Out' />
        </ListItem>
      </List>
    </Drawer>
  )
};

const mapDispatchToPorps = (dispatch) => ({
  signoutUser: () => dispatch(signoutUser()),
});

export default connect(null, mapDispatchToPorps)
  (SideBar);
