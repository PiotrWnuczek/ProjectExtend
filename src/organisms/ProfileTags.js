import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTag, removeTag } from 'store/tagsActions';
import { Card, Autocomplete, TextField } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Tag } from '@mui/icons-material';

const ProfileTags = ({ createTag, removeTag, id, tags, profile, owner }) => {
  const [value, setValue] = useState(profile.tags);
  const [length, setLength] = useState(value.length);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2, mb: 2 }}
      variant='outlined'
    >
      <Box sx={{ display: 'flex', pb: 2 }} >
        <Tag sx={{ color: 'primary.main', pr: 1 }} />
        <Typography variant='button'>
          Tags
        </Typography>
      </Box>
      <Autocomplete
        value={value}
        onChange={(e, value) => {
          setValue(value);
          value.length > length && createTag(value, null, id);
          value.length < length && removeTag(value, null, id);
          setLength(value.length);
        }}
        renderInput={(params) => <TextField {...params} label='Profile tags' />}
        options={tags ? tags : []}
        filterSelectedOptions
        disableClearable
        readOnly={!owner}
        multiple
        freeSolo
        fullWidth
        size='small'
      />
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createTag: (data, project, profile) => dispatch(createTag(data, project, profile)),
  removeTag: (data, project, profile) => dispatch(removeTag(data, project, profile)),
});

export default connect(null, mapDispatchToProps)
  (ProfileTags);
