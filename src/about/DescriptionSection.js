import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Screen from 'screen.png';

const DescriptionSection = () => (
  <Grid container p={5}>
    <Grid
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      item sm={6} p={2}
    >
      <Box
        sx={{ maxWidth: 600, width: '100%', height: 'auto' }}
        component='img'
        src={Screen}
      />
    </Grid>
    <Grid
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      item sm={6} p={2}
    >
      <Typography>
        Organizuj projekty zespołowe, szybko i prosto zarządzaj zadaniami w agile
        Twórz sprinty w projektach, precyzyjnie opisuj zadania w formacie Mark Down, szybko i prosto rozdzielaj pracę w zespole
        <br />
        Planuj swój czas i organizuj zadania na każdy tydzień
        Nowy tydzień to nowy sprint pełen wyzwań, planuj zadania i notuj wszystkie ważne sprawy
        <br />
        Buduj zespoły projektowe i dołączaj do ciekawych projektów
        Ustaw projekt jako Public, aby można było wyszukać go w Social Space i aplikować do dołączenia.
      </Typography>
    </Grid>
  </Grid>
);

export default DescriptionSection;
