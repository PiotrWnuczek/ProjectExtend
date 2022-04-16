import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTask } from 'store/projectsActions';
import { Box, MenuItem, OutlinedInput, InputLabel, Select } from '@mui/material';
import { Card, CardHeader, Avatar, Typography } from '@mui/material';
import { Grid, IconButton, Collapse, TextField, FormControl } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/lab';
import { Task, Edit, Check } from '@mui/icons-material';
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
  useEffect(() => { open && setExpand(true) }, [open, setExpand]);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={<Typography>
          {task.content}
        </Typography>}
        avatar={<Avatar
          sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'info.light' } }}
          onClick={() => setExpand(!expand)}
        >
          <Task />
        </Avatar>}
        action={<Box sx={{ display: 'block', textAlign: 'right' }}>
          {!edit && <IconButton onClick={() => { setEdit(true); setExpand(true); }}>
            <Edit />
          </IconButton>}
          {edit && <IconButton type='submit' form='edit'>
            <Check />
          </IconButton>}
        </Box>}
      />
      <Collapse in={expand} timeout='auto'>
        <Box sx={{ p: 2, pt: 0 }}>
          {edit && <Box sx={{ pb: 2 }}>
            <Formik
              initialValues={{ content: task.content }}
              onSubmit={(values) => {
                updateTask(values, task.id, id);
                resetId();
                setEdit(false);
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} id='edit' autoComplete='off'>
                  <TextInput
                    sx={{ m: 0 }}
                    onChange={handleChange}
                    value={values.content}
                    label='Content'
                    name='content'
                    type='text'
                    size='small'
                    multiline
                    rows={3}
                  />
                </form>
              )}
            </Formik>
          </Box>}
          <Grid container spacing={1}>
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
        </Box>
      </Collapse>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateTask: (data, id, project) => dispatch(updateTask(data, id, project)),
  resetId: () => dispatch({ type: 'RESETID_TASK' }),
});

export default connect(null, mapDispatchToProps)
  (TaskCard);
