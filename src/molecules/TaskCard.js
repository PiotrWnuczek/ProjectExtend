import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTask, removeTask } from 'store/projectsActions';
import { Box, MenuItem, OutlinedInput, InputLabel, IconButton, } from '@mui/material';
import { Card, Typography, Select, Button } from '@mui/material';
import { Grid, Collapse, TextField, FormControl } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/lab';
import { MoreVert, Task } from '@mui/icons-material';
import { Formik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextInput from 'atoms/TextInput';

const TaskCard = ({ updateTask, removeTask, task, sprint, id, open, project, resetId }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [options, setOptions] = useState(false);
  const [date, setDate] = useState(new Date());
  const [assigned, setAssigned] = useState([]);
  const names = project.members.map(m => m.nickname);
  useEffect(() => { open && setEdit(true) }, [open, setEdit]);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2 }}
      variant='outlined'
    >
      <Typography
        sx={{ cursor: 'pointer' }}
        onClick={() => setEdit(true)}
      >
        {task.content}
      </Typography>
      {edit && <Formik
        initialValues={{ content: task.content }}
        onSubmit={(values) => {
          updateTask(values, task.id, sprint, id);
          resetId(); setEdit(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ mb: 0, mt: 1 }}
              onChange={handleChange}
              value={values.content}
              label='Content'
              name='content'
              type='text'
              size='small'
              multiline
              rows={3}
              autoFocus
            />
          </form>
        )}
      </Formik>}
      <Collapse in={expand} timeout='auto'>
        <Grid sx={{ pt: 1 }} container spacing={1}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                value={date}
                onChange={(v) => setDate(v)}
                renderInput={(params) => <TextField {...params} size='small' fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ maxWidth: '40vw' }} size='small' fullWidth>
              <InputLabel>Name</InputLabel>
              <Select
                multiple
                value={assigned}
                onChange={(e) => setAssigned(e.target.value)}
                input={<OutlinedInput label='Assigned' size='small' />}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name} >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Collapse>
      <Box sx={{ display: 'flex', alignItems: 'center', pt: 1 }}>
        <Task sx={{ color: 'primary.main', pr: 1, fontSize: 20 }} />
        <Button
          onClick={() => setExpand(!expand)}
          size='small'
        >
          Details
        </Button>
        <Box sx={{ ml: 'auto' }}>
          {options && <Button
            onClick={() => removeTask(task.id, sprint, id)}
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
  updateTask: (data, id, sprint, project) => dispatch(updateTask(data, id, sprint, project)),
  removeTask: (id, sprint, project) => dispatch(removeTask(id, sprint, project)),
  resetId: () => dispatch({ type: 'RESETID_TASK' }),
});

export default connect(null, mapDispatchToProps)
  (TaskCard);
