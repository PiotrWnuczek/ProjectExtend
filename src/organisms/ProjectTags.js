import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTag, removeTag } from 'store/tagsActions';
import { Card, Autocomplete, TextField } from '@mui/material';

const ProjectTags = ({ createTag, removeTag, id, tags, project, member }) => {
  const [value, setValue] = useState(project.tags);
  const [length, setLength] = useState(value.length);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2, mb: 2 }}
      variant='outlined'
    >
      <Autocomplete
        value={value}
        onChange={(e, value) => {
          setValue(value);
          value.length > length && createTag(value, id, null);
          value.length < length && removeTag(value, id, null);
          setLength(value.length);
        }}
        renderInput={(params) => <TextField {...params} label='Tags' />}
        options={tags ? tags : []}
        filterSelectedOptions
        disableClearable
        readOnly={member ? 0 : 1}
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
  (ProjectTags);
