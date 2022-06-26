import React from 'react';
import { Grid, Typography } from '@mui/material';
import { AccountTree, ManageAccounts, Groups } from '@mui/icons-material';

const FeaturesSection = () => (
  <Grid container p={5}>
    <Grid item sm={4}>
      <AccountTree />
      <Typography>
        Jesteś programistą, studentem, albo po prostu chcesz dobrze zorganizować swoje projekty?
      </Typography>
    </Grid>
    <Grid item sm={4}>
      <ManageAccounts />
      <Typography>
        Potrzebujesz prostego narzędzia do zarządzania zadaniami indywidualnie lub zespołowo?
      </Typography>
    </Grid>
    <Grid item sm={4}>
      <Groups />
      <Typography>
        Chcesz tworzyć zespoły projektowe, albo wyszukiwać i dołączać do ciekawych projektów?
      </Typography>
    </Grid>
  </Grid>
);

export default FeaturesSection;
