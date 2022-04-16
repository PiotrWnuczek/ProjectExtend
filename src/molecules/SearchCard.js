import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Box } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchCard = ({ queryTags, tags }) => {
  const [value, setValue] = useState([]);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 2 }}
      variant='outlined'
    >
      <Box
        sx={{ p: 2, display: 'flex' }}
        onSubmit={(e) => { e.preventDefault(); value.length && queryTags(value); }}
        component='form'
      >
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
          type='submit'
          variant='outlined'
        >
          <Search />
        </Button>
      </Box>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  queryTags: (data) => dispatch({ type: 'QUERY_TAGS', data }),
});

export default connect(null, mapDispatchToProps)
  (SearchCard);
