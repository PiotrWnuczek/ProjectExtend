import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeSprint } from 'store/projectsActions';
import { Card, Box, Typography } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { format } from 'date-fns';

const SprintCard = ({ removeSprint, previous, next, sprintDate, sprintId, id, nr }) => {
  const [options, setOptions] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 1 }}
      variant='outlined'
    >
      <Box sx={{ p: 2, display: 'flex' }}>
        <Typography>
          Sprint: {nr.l - nr.n}, created at {format(sprintDate.toDate(), 'do MMMM HH:mm:ss ')}
          <Button
            sx={{ ml: 1 }}
            onClick={() => previous()}
            size='small'
            disabled={nr.l - nr.n < 2}
          >
            Previous Sprint
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={() => next()}
            size='small'
            disabled={nr.l >= 20}
          >
            {nr.n > 0 ? 'Next Sprint' : 'New Sprint'}
          </Button>
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          {options && <Button
            onClick={() => removeSprint(sprintId, id)}
            size='small'
            color='error'
            disabled={nr.l < 2}
          >
            Remove
          </Button>}
          <IconButton
            onClick={() => setOptions(!options)}
            size='small'
          >
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  removeSprint: (id, project) => dispatch(removeSprint(id, project)),
});

export default connect(null, mapDispatchToProps)
  (SprintCard);
