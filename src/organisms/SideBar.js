import React from 'react';
import { connect } from 'react-redux';
import { signoutUser } from 'store/usersActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Avatar, List, ListItem } from '@mui/material';
import { Box, ListItemText, ListItemAvatar } from '@mui/material';
import { Person, Dashboard } from '@mui/icons-material';
import { People, Logout } from '@mui/icons-material';
import Logo from 'logo.png';

const SideBar = ({ signoutUser, auth, ...props }) => {
  const profilePath = '/profile/' + auth.uid;
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { text: <>Your<br />Profile</>, icon: <Person />, path: profilePath },
    { text: <>Your<br />Board</>, icon: <Dashboard />, path: '/board' },
    { text: <>Social<br />Space</>, icon: <People />, path: '/space' },
  ];

  return (
    <Drawer {...props}>
      <List>
        <ListItem sx={{ mb: 12 }}>
          <Box
            sx={{ cursor: 'pointer', maxWidth: 120, }}
            onClick={() => navigate('/board')}
            src={Logo} alt='Logo'
            component='img'
          />
        </ListItem>
        {menu.map(item => <ListItem
          sx={{ textTransform: 'uppercase' }}
          key={item.path}
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
        </ListItem>)}
      </List>
      <List>
        <ListItem
          sx={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}
          onClick={signoutUser}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Logout />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary={<>Sign<br />Out</>} />
        </ListItem>
      </List>
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
