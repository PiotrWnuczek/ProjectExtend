import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Person } from '@mui/icons-material';

const AssignDialog = ({ names, updateTask, task, sprintId, id }) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(names && names.map((n) => (
      task.assigned && task.assigned.includes(n) ?
        { name: n, sel: true } : { name: n, sel: false }
    )))
  }, [names, task]);

  return (
    <Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <Person sx={{ color: 'primary.main', fontSize: 20, pr: 1 }} />
        <Typography sx={{ fontSize: '90%' }}>
          {task.assigned && task.assigned.map(a => a + ' ')}
        </Typography>
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          updateTask({
            assigned: list.filter(i => i.sel).map(i => i.name)
          }, task.id, sprintId, id);
          setOpen(false);
        }}
      >
        <DialogTitle>Assign people to task</DialogTitle>
        {list.map((item) => (
          <MenuItem
            onClick={() => setList(
              list.map(i => i === item ? { ...i, sel: !i.sel } : i)
            )}
            key={item.name}
            selected={item.sel}
            size='small'
          >
            {item.name}
          </MenuItem>
        ))}
        <DialogActions>
          <Button
            onClick={() => {
              updateTask({ assigned: null }, task.id, sprintId, id);
              setOpen(false);
            }}
            size='small'
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              updateTask({
                assigned: list.filter(i => i.sel).map(i => i.name)
              }, task.id, sprintId, id);
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

export default AssignDialog;
