import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Dialog, DialogActions, TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import { Event } from '@mui/icons-material';
import { format } from 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const DateDialog = ({ updateTask, task, sprintId, id }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <Event sx={{ color: 'primary.main', fontSize: 20, pr: 1 }} />
        <Typography sx={{ fontSize: '90%' }}>
          {task.date && format(task.date.toDate(), 'do MMMM')}
        </Typography>
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          updateTask({ date: value }, task.id, sprintId, id);
          setOpen(false);
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            renderInput={
              (params) => <TextField {...params} />
            }
            value={task.date ? task.date.toDate() : null}
            onChange={(v) => setValue(v)}
          />
        </LocalizationProvider>
        <DialogActions>
          <Button
            onClick={() => {
              updateTask({ date: null }, task.id, sprintId, id);
              setOpen(false);
            }}
            size='small'
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              updateTask({ date: value }, task.id, sprintId, id);
              setOpen(false);
            }}
            size='small'
          >
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

export default DateDialog;
