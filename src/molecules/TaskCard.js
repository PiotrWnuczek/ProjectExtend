import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTask } from 'store/projectsActions';
import { MenuItem, OutlinedInput, InputLabel, Select } from '@mui/material';
import { Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';
import { Grid, IconButton, Collapse, TextField, FormControl } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import { Task, ExpandMore, Edit, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextInput from 'atoms/TextInput';

const TaskCard = ({ updateTask, task, id, open }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(open);
  const [date, setDate] = useState(new Date());
  const [person, setPerson] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPerson(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  return (
    <Card
      sx={{ bgcolor: 'secondary.light' }}
      variant='outlined'
    >
      <CardHeader
        title={<>
          {!edit && <Typography>
            {task.content}
          </Typography>}
          {edit && <Formik
            initialValues={{ content: task.content }}
            onSubmit={(values) => { updateTask(values, task.id, id); setEdit(false); }}
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
          </Formik>}
        </>}
        avatar={<Avatar>
          <Task />
        </Avatar>}
        action={<>
          {!edit && <IconButton onClick={() => { setEdit(true) }}>
            <Edit />
          </IconButton>}
          {edit && <IconButton type='submit' form='edit'>
            <Check />
          </IconButton>}
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />
      <Collapse in={expand} timeout='auto'>
        <CardContent>
          <Grid container>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={date}
                  onChange={(v) => setDate(v)}
                  renderInput={(params) => <TextField {...params} size='small' />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <FormControl size='small' sx={{ width: 200 }}>
                <InputLabel>Name</InputLabel>
                <Select
                  multiple
                  value={person}
                  onChange={handleChange}
                  input={<OutlinedInput label='Name' size='small' />}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateTask: (data, id, project) => dispatch(updateTask(data, id, project)),
});

export default connect(null, mapDispatchToProps)
  (TaskCard);
