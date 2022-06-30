import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Card } from '@mui/material';
import { Typography, Button, Link } from '@mui/material';

const FrontLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      height: '100vh', display: 'flex', textAlign: 'center',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Container maxWidth='sm'>
        <Card
          sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 3, mb: 2 }}
          variant='outlined'
        >
          {children}
        </Card>
        <Box sx={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <Typography>
            Copyright © projectextend.com
          </Typography>
          <Link
            sx={{ ml: 1 }}
            href='https://piotrwnuczek.pl/'
            target='_blank'
            underline='hover'
          >
            Created by Piotr Wnuczek
          </Link>
        </Box>
        <Button
          sx={{ mt: 1 }}
          onClick={() => navigate('/about')}
          size='small'
        >
          About App
        </Button>
      </Container>
    </Box>
  )
};

export default FrontLayout;
