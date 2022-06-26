import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateSprint, removeSprint } from 'store/projectsActions';
import { Card, Box, Typography } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { MoreVert, Check } from '@mui/icons-material';
import { format } from 'date-fns';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';
import SprintDialog from 'atoms/SprintDialog';

const SprintCard = ({ updateSprint, removeSprint, previous, next, sprint, id, nr }) => {
  const [options, setOptions] = useState(false);
  const [name, setName] = useState(false);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 1 }}
      variant='outlined'
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>
          Sprint: {nr.l - nr.n}
        </Typography>
        {!name && <Typography
          sx={{ cursor: 'pointer' }}
          onClick={() => setName(true)}
        >
          {sprint.name || 'created: ' + format(sprint.date.toDate(), 'do MMMM HH:mm')}
        </Typography>}
        {name && <Formik
          initialValues={{
            name: sprint.name || 'created: ' + format(sprint.date.toDate(), 'do MMMM HH:mm')
          }}
          onSubmit={(values) => {
            values.name && values.name !== sprint.name &&
              updateSprint(values, sprint.id, id);
            setName(false);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
              <TextInput
                sx={{ mb: 0, mt: 1 }}
                onChange={handleChange}
                value={values.name}
                label='Name'
                name='name'
                type='text'
                size='small'
                autoFocus
                InputProps={{
                  endAdornment: <IconButton
                    sx={{ mx: -1 }}
                    type='submit'
                    size='small'
                  >
                    <Check />
                  </IconButton>
                }}
              />
            </form>
          )}
        </Formik>}
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
        <SprintDialog />
        <Box sx={{ ml: 'auto' }}>
          {options && <Button
            onClick={() => removeSprint(sprint.id, id)}
            size='small'
            color='error'
            disabled={nr.l - nr.n < 2}
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
  updateSprint: (data, id, project) => dispatch(updateSprint(data, id, project)),
  removeSprint: (id, project) => dispatch(removeSprint(id, project)),
});

export default connect(null, mapDispatchToProps)
  (SprintCard);
