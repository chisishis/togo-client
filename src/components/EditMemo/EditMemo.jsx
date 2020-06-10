import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import AbsoluteCancelIcon from "../common/AbsoluteCanceIIcon";
import { useDispatch } from "react-redux";

import { updatePostStart } from "../../redux/posts/posts.actions";
import { useDialogSize } from "../../hooks/useDialogSize";



const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px",
  },

}));

const EditMemo = ({ open, closeHandler, memo, postId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const dialogSize = useDialogSize();

  const [currentMemo, setCurrentMemo] = useState(memo);

  const handleChange = (e) => {
    setCurrentMemo(e.target.value);
  };

  const updateMemo = async () => {
    closeHandler();
    dispatch(
      updatePostStart({
        id: postId,
        objectKey: "memo",
        objectValue: currentMemo,
      })
    );
  };

  return (
    <Dialog
      className={classes.root}
      open={open}
      fullWidth={dialogSize}
      fullScreen={!dialogSize}
      onClose={closeHandler}
    >
      <DialogTitle>
        Edit Memo
        <AbsoluteCancelIcon clickHandler={closeHandler} />
      </DialogTitle>

      <DialogContent dividers={true}>
        <DialogContentText>
          Please edit memo
        </DialogContentText>
        
        <TextField
          id="outlined-search"
          label="Add a tag here"
          type="text"
          variant="outlined"
          onChange={handleChange}      
          value={currentMemo}    
          autoFocus
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeHandler}
          color="secondary"
          children={"cancel"}         
        />

        <Button
          onClick={updateMemo}
          color="secondary"
          variant="contained"
          children={"Update"}
        />
      </DialogActions>
    </Dialog>
  );
};

EditMemo.propTypes = {};

export default EditMemo;
