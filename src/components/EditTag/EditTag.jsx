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
import ChipDisplayComponent from "../common/ChipDisplayComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px",
  },
}));

const EditTag = ({ open, closeHandler, tags, postId }) => {
  const dispatch = useDispatch();

  const [selectedTags, setTags] = useState(tags);
  const [tag, setTag] = useState("");
  const classes = useStyles();
  const dialogSize = useDialogSize();

  const removeTag = (selectedTag) => () => {
    const filteredTags = selectedTags.filter(
      (tag) => tag !== selectedTag && tag
    );
    setTags(filteredTags);
  };

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const addTag = () => {
    setTags([...selectedTags, ...tag.split(" ")]);
    setTag("");
  };

  const updateTag = async () => {
    closeHandler();
    dispatch(
      updatePostStart({
        id: postId,
        objectKey: "tags",
        objectValue: selectedTags,
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
        Edit Tag
        <AbsoluteCancelIcon clickHandler={closeHandler} />
      </DialogTitle>

      <DialogContent dividers={true}>
        <DialogContentText>
          Add or remove tag(s) - Multiple tags can be added with space
        </DialogContentText>

        <ChipDisplayComponent chips={selectedTags} deleteHandler={removeTag} />
        <TextField
          id="outlined-search"
          label="Add a tag here"
          type="text"
          variant="outlined"
          onChange={handleChange}
          value={tag}
          autoFocus
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={addTag}
          color="secondary"
          children={"add"}
          disabled={tag.length === 0}
        />

        <Button
          onClick={updateTag}
          color="secondary"
          variant="contained"
          children={"save"}
        />
      </DialogActions>
    </Dialog>
  );
};

EditTag.propTypes = {};

export default EditTag;
