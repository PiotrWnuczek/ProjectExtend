import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { red, green, blue, orange, indigo } from '@mui/material/colors';
import { PersonOutline, Input } from '@mui/icons-material';

const ProfileCard = ({ user }) => {
  const colors = [red, green, blue, orange, indigo];
  const number = user.firstname && user.firstname.charCodeAt(0) % 5;
  let avatarColor = user.firstname ? colors[number][700] : blue[700];
  const navigate = useNavigate();

  return (
    <Card
      sx={{ bgcolor: 'secondary.light' }}
      variant='outlined'
      key={user.id}
    >
      <CardHeader
        title={user.firstname + ' ' + user.lastname}
        subheader={user.keywords}
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }}>
            <PersonOutline />
          </Avatar>
        }
        action={
          <IconButton
            onClick={() => navigate('/profile/' + user.id)}
          >
            <Input />
          </IconButton>
        }
      />
      <CardContent>
        <Typography>
          {user.about}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default ProfileCard;
