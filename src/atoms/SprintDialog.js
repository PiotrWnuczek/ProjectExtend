import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSprint } from 'store/projectsActions';
import { Box, Button, Dialog, DialogTitle, Avatar } from '@mui/material';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { TextSnippet, Add } from '@mui/icons-material';
import { format } from 'date-fns';

const SprintDialog = ({ createSprint, setSid, sid, sprints, id }) => {
  const [open, setOpen] = useState(false);
  const date = new Date();
  date.setDate(date.getDate() + 7);

  return (
    <Box>
      <Button
        sx={{ ml: 1 }}
        onClick={() => setOpen(true)}
        size='small'
      >
        All Sprints
      </Button>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>Select or add sprint</DialogTitle>
        <List dense>
          {sprints.map(sprint => <ListItem
            onClick={() => {
              setSid(sprint.id);
              setOpen(false);
            }}
            key={sprint.date}
            selected={sprint.id === sid}
            button
          >
            <ListItemAvatar>
              <Avatar>
                <TextSnippet />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={sprint.name}
              secondary={sprint.date && format(sprint.date.toDate(), 'do MMMM HH:mm')}
            />
          </ListItem>)}
          <ListItem
            onClick={() => {
              createSprint(id);
              setSid('new');
              setOpen(false);
            }}
            button
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Add Sprint' />
          </ListItem>
        </List>
      </Dialog>
    </Box>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createSprint: (project) => dispatch(createSprint(project)),
});

export default connect(null, mapDispatchToProps)
  (SprintDialog);
