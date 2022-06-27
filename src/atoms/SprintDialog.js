import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSprint } from 'store/projectsActions';
import { Box, Button, Dialog, DialogTitle, Avatar } from '@mui/material';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Person, Add } from '@mui/icons-material';
import { format } from 'date-fns';

const SprintDialog = ({ createSprint, setSid, sprints, id }) => {
  const [open, setOpen] = useState(false);

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
        <DialogTitle>All Sprints</DialogTitle>
        <List>
          {sprints.map(sprint => <ListItem
            onClick={() => {
              setSid(sprint.id);
              setOpen(false);
            }}
            key={sprint.date}
            button
          >
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={sprint.id}
              secondary={sprint.name || 'created: ' + format(sprint.date.toDate(), 'do MMMM HH:mm')}
            />
          </ListItem>)}
          <ListItem
            onClick={() => {
              createSprint(id);
              setSid(false);
              setOpen(false);
            }}
            button
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary='Add Sprint' />
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
