import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTag } from 'store/tagsActions';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { Typography, Button, IconButton, Collapse } from '@mui/material';
import { Box, Autocomplete, TextField } from '@mui/material';
import { Tag, ExpandMore, Edit, Check, Add } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import TagCard from 'molecules/TagCard';

const ProjectTags = ({ createTag, project, id, tags, member }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
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
          {member && !edit && <IconButton onClick={() => { setEdit(true); setExpand(true); }}>
            <Edit />
          </IconButton>}
          {member && edit && <IconButton onClick={() => { setEdit(false); }}>
            <Check />
          </IconButton>}
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
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
              type='submit'
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
            {project.tags.map(tag =>
              <TagCard key={tag} tag={tag} project={id} profile={null} />
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
  (ProjectTags);
