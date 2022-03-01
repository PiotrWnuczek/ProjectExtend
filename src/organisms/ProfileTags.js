import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTag } from 'store/tagsActions';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { Typography, Button, IconButton, Collapse } from '@mui/material';
import { Box, Autocomplete, TextField } from '@mui/material';
import { Tag, ExpandMore, Edit, Add } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import TagCard from 'molecules/TagCard';

const ProfileTags = ({ createTag, profile, id, tags }) => {
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const breakpoints = { default: 5, 1100: 4, 700: 3 };

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography variant='h6'>
          Tags
        </Typography>}
        avatar={<Avatar>
          <Tag />
        </Avatar>}
        action={<>
          <IconButton onClick={() => { setOpen(!open); setExpand(true); }}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <Collapse in={open} timeout='auto'>
          <Box sx={{ p: 2, display: 'flex' }}>
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
        <CardContent>
          <Masonry
            breakpointCols={breakpoints}
            className='masonryGrid'
            columnClassName='masonryGridColumn'
          >
            {profile.tags.map(tag =>
              <TagCard key={tag} tag={tag} profile={id} project={null} />
            )}
          </Masonry>
        </CardContent>
      </Collapse>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createTag: (data, project, profile) => dispatch(createTag(data, project, profile)),
});

export default connect(null, mapDispatchToProps)
  (ProfileTags);
