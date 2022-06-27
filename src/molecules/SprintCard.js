import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateSprint, removeSprint } from 'store/projectsActions';
import { Card, Box, Typography } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import { MoreVert, Check, TextSnippet } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';
import SprintDialog from 'atoms/SprintDialog';
import TermDialog from 'atoms/TermDialog';

const SprintCard = ({ updateSprint, removeSprint, setSid, sprints, sprint, id }) => {
  const [options, setOptions] = useState(false);
  const [name, setName] = useState(false);
  useEffect(() => { !sprint.name && setName(true) }, [sprint, setName]);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 1 }}
      variant='outlined'
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        {!name && <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}
          onClick={() => setName(true)}
        >
          <TextSnippet sx={{ color: 'primary.main', pr: 1 }} />
          <Typography>
            {sprint.name}
          </Typography>
        </Box>}
        {name && <Formik
          initialValues={{ name: sprint.name || 'New Sprint' }}
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
        <TermDialog
          updateSprint={updateSprint}
          sprint={sprint}
          id={id}
        />
        <SprintDialog
          setSid={setSid}
          sid={sprint.id}
          sprints={sprints}
          id={id}
        />
        <Box sx={{ ml: 'auto' }}>
          {options && <Button
            onClick={() => {
              removeSprint(sprint.id, id);
              setSid(false);
            }}
            disabled={sprints.length < 2}
            size='small'
            color='error'
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
