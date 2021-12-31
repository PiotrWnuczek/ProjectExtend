import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { red, green, blue, orange, indigo } from '@mui/material/colors';
import { FolderOpen } from '@mui/icons-material';

const ProfileCard = ({ user }) => {
  const colors = [red, green, blue, orange, indigo];
  const number = user.firstname.charCodeAt(0) % 5;
  let avatarColor = colors[number][700];
  const navigate = useNavigate();

  return (
    <Card
      sx={{ bgcolor: 'secondary.light' }}
      variant='outlined'
      key={user.id}
    >
      <CardHeader
        title={user.firstname + ' ' + user.lastname}
        subheader={user.email}
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }}>
            {user.firstname[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            onClick={() => navigate('/profile/' + user.id)}
          >
            <FolderOpen />
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
