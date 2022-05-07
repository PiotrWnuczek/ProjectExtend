import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTask, removeTask } from 'store/projectsActions';
import { Box, Card, Button, IconButton } from '@mui/material';
import { Check, MoreVert } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DateDialog from 'atoms/DateDialog';
import AssignDialog from 'atoms/AssignDialog';

const TaskCard = ({ updateTask, removeTask, task, sprintId, id, open, project, resetId }) => {
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
      <Box sx={{ display: 'flex', pt: 1 }}>
        <DateDialog
          updateTask={updateTask}
          task={task}
          sprintId={sprintId}
          id={id}
        />
        <AssignDialog
          names={names}
          updateTask={updateTask}
          task={task}
          sprintId={sprintId}
          id={id}
        />
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
            <MoreVert sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
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
