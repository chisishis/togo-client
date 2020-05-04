import React, { useState } from "react";
import PropTypes from 'prop-types';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { useAuth } from '../../contexts/user.provider'

import { deletePost } from '../../util/posts'


const DeletePost = ({ id, isOpen }) => {

  const token = useAuth().user.token;
  
  
  const [open, setOpen] = useState(isOpen);

  console.log(open)
  const handleMenu = () => {
      setOpen(!open);
  }

  const handleDelete = () => {
      const result = deletePost(id, token)
      console.log(result)
      handleMenu();
  }

  return (
    <Dialog
      open={open}
      onClose={handleMenu}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="elete-dialog-title">
        {"Delete Post?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
        Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button variant='contained' onClick={handleMenu} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
     
      </DialogActions>
    </Dialog>
  );
};

DeletePost.propTypes = {
    id : PropTypes.string,   
    isOpen: PropTypes.bool
}

export default DeletePost;
