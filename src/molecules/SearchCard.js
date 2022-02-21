import React, { useState } from 'react';
import { Button, Card, Box } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchCard = ({ tags }) => {
  const [value, setValue] = useState([]);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      <Box sx={{ p: 2, display: 'flex' }}>
        <Autocomplete
          value={value}
          onChange={(e, value) => setValue(value)}
          renderInput={(params) => <TextField {...params} label='Tags' />}
          options={tags}
          filterSelectedOptions
          multiple
          freeSolo
          fullWidth
          size='small'
        />
        <Button
          onClick={() => { console.log(value); setValue([]); }}
          variant='outlined'
        >
          <Search />
        </Button>
      </Box>
    </Card>
  )
};

export default SearchCard;
