import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";



import { shortenUrl, analizeMemo, fetchOg } from "../../util";

import { startNewPost } from "../../util/firebase";

import { connect } from "react-redux";

import { status, shareStatus } from "../../assets/constants";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "0px auto 0px auto",
  },
  textArea: {
    margin: "0px auto 0px auto",
  },

  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 16,
  },
  progress: {
    position: "absolute",
  },
  stepperButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    width: "100%",
  },

  backDrop: {
    background: "rgba(255,255,255,0.7)",
  },
  link: {
    margin: 8,
    background: "#F2F3F5",
  },
  media: {
    height: 240,
  },
  title: {
    color: "#444",
  },
  url: {
    color: "#777",
  },
}));

const NewPost = ({
  userId,
  displayName,
  email,
  // link,
  closeHandler,
  exitHandler,
}) => {
  const classes = useStyles();

  const [post, setPost] = useState({
    userId,
    email,
    displayName,
    memo: "",
    currentStatus: status.CREATED,
  });

  const shareWith = [shareStatus.PUBLIC];
  const [tags, setTags] = useState([]);
  const statusDates = [{ 
    type: 'created',
    date: new Date().toISOString()}];
  const [link, setLink] = useState({
    url: null,
    imageUrl: null,
    title: null,
    description: null,
    isValid: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    startNewPost(post, shareWith, tags, statusDates, link);
  };

  const handleChangeMemo = async (e) => {
    e.preventDefault();

    const memo = e.target.value;

    const analizedMemo = analizeMemo(memo);
    const selectedTags = analizedMemo.tags();
    const selectedUrl = analizedMemo.url();

    selectedTags.length !== 0 && setTags(selectedTags);
    if (Boolean(selectedUrl) && !link.isValid) {
      const fetchedLink = await fetchOg(selectedUrl);
      setLink(fetchedLink);
    }
    setPost({ ...post, memo: memo });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <DialogTitle id="login-dialog-title">
        {" "}
        {"Create Post"}
     
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="h6">{displayName}</Typography>

        <TextField
          id="post-memo"
          name="post-memo"
          type="text"
          label="paste URL to browse the data "
          className={classes.textArea}
          value={post.memo}
          onChange={handleChangeMemo}
          fullWidth
          multiline={true}
          rows={6}
          rowsMax={6}
          required
          autoFocus
        />
      </DialogContent>

      {link.isValid ? (
        <Card className={classes.link}>
          {link.imageUrl ? (
            <CardMedia
              className={classes.media}
              component="img"
              alt="link image"
              image={link.imageUrl}
              title={link.title}
            />
          ) : (
            <div></div>
          )}
          <CardContent>
            <Typography className={classes.url} variant="body2" align="left">
              {shortenUrl(link.url).toUpperCase()}
            </Typography>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {link.title}
            </Typography>
            <Typography
              className={classes.title}
              gutterBottom
              variant="body2"
              component="p"
            >
              {link.description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div></div>
      )}

      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
          fullWidth
        >
          POST
        </Button>
      </DialogActions>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  email: state.user.userData.email,
  displayName: state.user.userData.displayName,
  userId: state.user.userData.userId,
  closeHandler: ownProps.closeHandler,
  exitHandler: ownProps.exitHandler,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
