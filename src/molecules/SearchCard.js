import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Box } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchCard = ({ searchTags, tags }) => {
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
          options={tags ? tags : []}
          filterSelectedOptions
          multiple
          freeSolo
          fullWidth
          size='small'
        />
        <Button
          onClick={() => { value.length && searchTags(value) }}
          variant='outlined'
        >
          <Search />
        </Button>
      </Box>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  searchTags: (data) => dispatch({ type: 'SEARCH_TAGS', data }),
});

export default connect(null, mapDispatchToProps)
  (SearchCard);
