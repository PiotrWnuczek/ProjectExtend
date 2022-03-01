import React from 'react';
import { connect } from 'react-redux';
import { removeTag } from 'store/tagsActions';
import { Card, CardHeader, IconButton, Typography } from '@mui/material';
import { Delete, Tag } from '@mui/icons-material';

const TagCard = ({ removeTag, tag, project, profile }) => (
  <Card
    sx={{ bgcolor: 'secondary.light' }}
    variant='outlined'
    key={tag}
  >
    <CardHeader
      title={
        <Typography>
          {tag}
        </Typography>
      }
      avatar={
        <Tag color='info' size='small' />
      }
      action={
        <IconButton
          onClick={() => removeTag(tag, project, profile)}
          size='small'
        >
          <Delete sx={{ fontSize: 18, mt: 0.3 }} />
        </IconButton>
      }
    />
  </Card>
);

const mapDispatchToProps = (dispatch) => ({
  removeTag: (data, project, profile) => dispatch(removeTag(data, project, profile)),
});

export default connect(null, mapDispatchToProps)
  (TagCard);
