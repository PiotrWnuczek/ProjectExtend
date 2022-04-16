import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTag } from 'store/tagsActions';
import { Card, CardHeader, Avatar, Grid } from '@mui/material';
import { Typography, Button, IconButton, Collapse } from '@mui/material';
import { Box, Autocomplete, TextField } from '@mui/material';
import { Tag, Edit, Check, Add } from '@mui/icons-material';
import TagCard from 'molecules/TagCard';

const ProfileTags = ({ createTag, profile, id, tags, owner }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='button'>
          Tags
        </Typography>}
        avatar={<Avatar
          sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'info.light' } }}
          onClick={() => setExpand(!expand)}
        >
          <Tag />
        </Avatar>}
        action={<>
          {owner && !edit && <IconButton onClick={() => { setEdit(true); setExpand(true); }}>
            <Edit />
          </IconButton>}
          {owner && edit && <IconButton onClick={() => { setEdit(false); }}>
            <Check />
          </IconButton>}
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <Collapse in={edit} timeout='auto'>
          <Box
            sx={{ p: 2, display: 'flex' }}
            onSubmit={(e) => { e.preventDefault(); createTag(value, id, null); setValue(''); }}
            component='form'
          >
            <Autocomplete
              value={value}
              onInputChange={(e, value) => setValue(value)}
              renderInput={(params) => <TextField {...params} label='Tags' />}
              options={tags ? tags : []}
              freeSolo
              fullWidth
              size='small'
            />
            <Button
              onClick={() => { createTag(value, null, id); setValue(''); }}
              variant='outlined'
            >
              <Add />
            </Button>
          </Box>
        </Collapse>
        <Box sx={{ p: 2 }}>
          <Grid container>
            {profile.tags.map(tag =>
              <Grid item key={tag}>
                <TagCard tag={tag} profile={id} project={null} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Collapse>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createTag: (data, project, profile) => dispatch(createTag(data, project, profile)),
});

export default connect(null, mapDispatchToProps)
  (ProfileTags);
