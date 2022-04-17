import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTask } from 'store/projectsActions';
import { Box, MenuItem, OutlinedInput, InputLabel, } from '@mui/material';
import { Card, Typography, Select, Button } from '@mui/material';
import { Grid, Collapse, TextField, FormControl } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/lab';
import { Task } from '@mui/icons-material';
import { Formik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextInput from 'atoms/TextInput';

const TaskCard = ({ updateTask, task, id, open, project, resetId }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
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
          updateTask(values, task.id, id);
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
          Task Details
        </Button>
      </Box>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateTask: (data, id, project) => dispatch(updateTask(data, id, project)),
  resetId: () => dispatch({ type: 'RESETID_TASK' }),
});

export default connect(null, mapDispatchToProps)
  (TaskCard);
