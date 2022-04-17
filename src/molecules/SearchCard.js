import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Autocomplete, TextField } from '@mui/material';

const SearchCard = ({ queryTags, tags }) => {
  const [value, setValue] = useState([]);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2, mb: 2 }}
      variant='outlined'
    >
      <Autocomplete
        value={value}
        onChange={(e, value) => {
          setValue(value);
          value.length && queryTags(value);
        }}
        renderInput={(params) => <TextField {...params} label='Search by tags' />}
        options={tags ? tags : []}
        filterSelectedOptions
        multiple
        freeSolo
        fullWidth
        size='small'
      />
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  queryTags: (data) => dispatch({ type: 'QUERY_TAGS', data }),
});

export default connect(null, mapDispatchToProps)
  (SearchCard);
