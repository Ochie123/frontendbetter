import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';



const AddCommentModal = ({  addComment }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [comment, setComment] = useState('');

  const onDialogOpen = () => { 
    setDialogOpen(true);
  };
  const onDialogClose = () => { 
    setDialogOpen(false); 
    setComment('');

       };
  const onSnackbarClose = (e, reason) => { 
    if (reason === 'clickaway') {
      return;
    
    }
    setSnackbarOpen(false);
    setSnackbarMessage('');
    };
  
    const onCreate = () => { 
      setSnackbarOpen(true);
      setSnackbarMessage(`${comment} created`);
      onDialogClose();
};


  return (
    <Fragment>
      <button className="btn btn-primary btn-lg w-100 mb-0" onClick={onDialogOpen}> 
        Add A Comment.
      </button>
    <Dialog open={dialogOpen} onClose={onDialogClose}>
      <DialogTitle>New Comment</DialogTitle>
      <DialogContent>
    <TextField
      autoFocus
      margin="normal"
      label="Comment"
      InputProps={{ name: 'comment' }} 
      onChange={e => setComment(e.target.value)} 
      value={comment}
      fullWidth />
  
    </DialogContent>
      <DialogActions>
      <Button onClick={onDialogClose} color="primary"> 
        Cancel
      </Button>
       <Button
        variant="contained" 
        onClick={onCreate} 
        color="primary"
      >
          Post
      </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen} 
        message={snackbarMessage} 
        onClose={onSnackbarClose} 
        autoHideDuration={4000}
      />
      </Fragment>
  );
};

export default AddCommentModal;
