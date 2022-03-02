import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTask } from 'store/projectsActions';
import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { Typography, IconButton, Collapse } from '@mui/material';
import { Task, ExpandMore, Edit, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const TaskCard = ({ updateTask, task, id, open }) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(open);

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
          Lorem ipsum dolor sit amet.
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
