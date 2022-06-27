import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import { DialogContent, DialogContentText } from '@mui/material';

const AlertDialog = ({ name, content, clickAction }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        variant='outlined'
        size='small'
        color='error'
      >
        {name}
      </Button>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>
          {name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            size='small'
          >
            Cancel
          </Button>
          <Button
            onClick={clickAction}
            size='small'
            color='error'
          >
            {name}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

export default AlertDialog;
