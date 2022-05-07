import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTask, removeTask } from 'store/projectsActions';
import { Box, Grid, Card, Button, IconButton, Typography } from '@mui/material';
import { TextField, OutlinedInput, Select, MenuItem } from '@mui/material';
import { Dialog, DialogActions, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import { Check, Event, MoreVert, Person } from '@mui/icons-material';
import { Formik } from 'formik';
import { format } from 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextInput from 'atoms/TextInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TaskCard = ({ updateTask, removeTask, task, sprintId, id, open, project, resetId }) => {
  const [date, setDate] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [edit, setEdit] = useState(false);
  const [options, setOptions] = useState(false);
  const names = project.members.map(m => m.nickname);
  useEffect(() => { open && setEdit(true) }, [open, setEdit]);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2 }}
      variant='outlined'
    >
      {!edit && <Box
        sx={{ cursor: 'pointer', fontSize: '90%' }}
        onClick={() => setEdit(true)}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {task.content}
        </ReactMarkdown>
      </Box>}
      {edit && <Formik
        initialValues={{ content: task.content }}
        onSubmit={(values) => {
          values.content && values.content !== task.content &&
            updateTask(values, task.id, sprintId, id);
          resetId(); setEdit(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ mb: 0, mt: 1 }}
              onChange={handleChange}
              value={values.content}
              label='Content (MarkDown)'
              name='content'
              type='text'
              size='small'
              multiline
              minRows={3}
              autoFocus
              InputProps={{
                endAdornment: <IconButton
                  sx={{ mx: -1, mb: -0.5, mt: 'auto' }}
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
      <Grid sx={{ display: 'flex', pt: 1 }} container>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 1 }}
          onClick={() => setDate(true)}
        >
          <Event sx={{ color: 'primary.main', pr: 1, fontSize: '100%' }} />
          <Typography sx={{ fontSize: '70%' }}>
            {task.date && format(task.date.toDate(), 'do MMMM')}
          </Typography>
        </Box>
        <Dialog
          open={date}
          onClose={() => setDate(false)}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              renderInput={(params) => <TextField {...params} />}
              value={task.date && task.date.toDate()}
              onChange={(v) => updateTask({ date: v }, task.id, sprintId, id)}
            />
          </LocalizationProvider>
          <DialogActions>
            <Button
              onClick={() => updateTask({ date: null }, task.id, sprintId, id)}
              size='small'
            >
              Clear
            </Button>
            <Button
              onClick={() => setDate(false)}
              size='small'
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {!assigned && <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setAssigned(true)}
        >
          <Person sx={{ color: 'primary.main', pr: 1, fontSize: '100%' }} />
          <Typography sx={{ fontSize: '70%' }}>
            {task.assigned && task.assigned.map(a => a + ' ')}
          </Typography>
        </Box>}
        {assigned && <Grid item xs={6}>
          <FormControl sx={{ maxWidth: '50vw' }} size='small' fullWidth>
            <InputLabel sx={{ fontSize: '70%', pt: 0.5 }}>Assigned</InputLabel>
            <Select
              sx={{ maxWidth: '50vw', fontSize: '70%' }}
              input={<OutlinedInput size='small' label='Assigned' />}
              value={task.assigned ? task.assigned : []}
              onChange={(e) => updateTask({ assigned: e.target.value }, task.id, sprintId, id)}
              onBlur={() => setAssigned(false)}
              multiple autoFocus
            >
              {names.map((name) => (
                <MenuItem
                  sx={{ fontSize: '70%' }}
                  key={name} value={name} size='small'
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>}
        <Box sx={{ ml: 'auto' }}>
          {options && <Button
            sx={{ fontSize: '70%' }}
            onClick={() => removeTask(task.id, sprintId, id)}
            size='small' color='error'
          >
            Remove
          </Button>}
          <IconButton
            onClick={() => setOptions(!options)}
            size='small'
          >
            <MoreVert sx={{ fontSize: '100%' }} />
          </IconButton>
        </Box>
      </Grid>
    </Card >
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateTask: (data, id, sprint, project) => dispatch(updateTask(data, id, sprint, project)),
  removeTask: (id, sprint, project) => dispatch(removeTask(id, sprint, project)),
  resetId: () => dispatch({ type: 'RESETID_TASK' }),
});

export default connect(null, mapDispatchToProps)
  (TaskCard);
