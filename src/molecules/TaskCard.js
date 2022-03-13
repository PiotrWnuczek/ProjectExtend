import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTask } from 'store/projectsActions';
import { Box, MenuItem, OutlinedInput, InputLabel, Select } from '@mui/material';
import { Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';
import { Grid, IconButton, Collapse, TextField, FormControl } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/lab';
import { Task, ExpandMore, Edit, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextInput from 'atoms/TextInput';

const TaskCard = ({ updateTask, task, id, open, team }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(open);
  const [date, setDate] = useState(new Date());
  const [assigned, setAssigned] = useState([]);
  const names = team.members.map(m => m.nickname);

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
        avatar={<Avatar sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Task />
        </Avatar>}
        action={<Box sx={{ display: 'block', textAlign: 'right' }}>
          {!edit && <IconButton onClick={() => { setEdit(true) }}>
            <Edit />
          </IconButton>}
          {edit && <IconButton type='submit' form='edit'>
            <Check />
          </IconButton>}
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </Box>}
      />
      <Collapse in={expand} timeout='auto'>
        <CardContent>
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
        </CardContent>
      </Collapse>
    </Card>
  )
};

const mapStateToProps = (state, props) => ({
  team: state.firestore.data[props.id + 'team'],
});

const mapDispatchToProps = (dispatch) => ({
  updateTask: (data, id, project) => dispatch(updateTask(data, id, project)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (TaskCard);
