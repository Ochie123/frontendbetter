import React, { Fragment,useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";

import {AuctionContext} from '../DetailPage';

import { useSnackbar } from "notistack"

const AddCommentModal = ({  addComment }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [message, setMessage] = useState('');

  const auction = useContext(AuctionContext);

  //console.log(auction?.uuid)

  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState("")

  const onDialogOpen = (evt) => { 
    evt.preventDefault();
    setDialogOpen(true);
  };
  const onDialogClose = (evt) => { 
    setDialogOpen(false); 
    setMessage('');

       };
  const onSnackbarClose = (e, reason) => { 
    if (reason === 'clickaway') {
      return;
    
    }
    setSnackbarOpen(false);
    setSnackbarMessage('');
    };
  
    const onCreate = (evt) => { 
      evt.preventDefault();

      const formData = new FormData();
      formData.append('auction', auction?.uuid);
      formData.append('message', message);
      
      const token = localStorage.getItem('token');

      axios
      .post('https://cars-bids.online/api/comment/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Handle the response or update any necessary state
        enqueueSnackbar(`${message} added`, {
          variant: 'success',
        });
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });



      onDialogClose();
};


  return (
    <Fragment>
      <button className="btn btn-primary btn-lg w-100 mb-0" onClick={onDialogOpen}> 
        Add A Message.
      </button>
    <Dialog open={dialogOpen} onClose={onDialogClose}>
      <DialogTitle>New Message</DialogTitle>
      <DialogContent>
    <TextField
      autoFocus
      margin="normal"
      label="Message"
      InputProps={{ name: 'message' }} 
      onChange={e => setMessage(e.target.value)} 
      value={message}
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
        disabled={message.trim() === ''}
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
