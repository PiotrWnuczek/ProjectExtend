import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Dialog, DialogActions, TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Event } from '@mui/icons-material';
import { format } from 'date-fns';

const TermDialog = ({ updateSprint, sprint, id }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <Event sx={{ color: 'primary.main', pr: 1 }} />
        <Typography>
          {sprint.date && format(sprint.date.toDate(), 'do MMMM HH:mm')}
        </Typography>
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => {
          updateSprint({ date: value || new Date() }, sprint.id, id);
          setOpen(false);
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            renderInput={
              (params) => <TextField {...params} />
            }
            value={sprint.date ? sprint.date.toDate() : new Date()}
            onChange={(v) => setValue(v)}
          />
        </LocalizationProvider>
        <DialogActions>
          <Button
            onClick={() => {
              updateSprint({ date: new Date() }, sprint.id, id);
              setOpen(false);
            }}
            size='small'
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              updateSprint({ date: value || new Date() }, sprint.id, id);
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

export default TermDialog;
