import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, Avatar } from '@mui/material';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Person, Add } from '@mui/icons-material';

const SprintDialog = () => {
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
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary='Sprint Description' />
          </ListItem>
          <ListItem button>
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

export default SprintDialog;
