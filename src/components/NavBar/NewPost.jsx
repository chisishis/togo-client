import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputBase from "@material-ui/core/InputBase";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import { isUrl, isTag } from "../../util/validUrl";

import CancelButton from "./CancelButton";



import {shortenUrl} from "../../util/utils"

import { usePost } from '../../contexts/post.provider'

import Axios from "axios";

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

const NewPost = ({token, userName}) => {
  const classes = useStyles();

  const { postNew }= usePost();
  
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [newPost, setNewPost] = useState({
    status: "created",
    memo: "",
    dates: {
      created: new Date().toDateString(),
      planned: "",
      postponed: "",
      cancelled: "",
      completed: "",
    },
    tag: [],
  });

  const [link, setLink] = useState({
    linkUrl: "",
    title: "",
    description: "",
    imageUrl: "",
    isValid: false,
  });

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const postArray = newPost.memo.split(/\s+/);
    const hashTag = postArray.filter( word => isTag(word)&& word.slice(1));
    const memo = postArray.filter(( word ) => !isTag(word) && !isUrl(word) && word).join(' ');

    postNew({ ...newPost, ...link, memo: memo, tag: hashTag }, token);
    setDialogOpen(!isDialogOpen);
  };

  const handleChange = (e) => {
    const memo = e.target.value;
    const inputFragment = memo.split(" ");
    const url = inputFragment.filter((sentence) => isUrl(sentence))[0];
   

    setNewPost({ ...newPost, memo: memo });

    if (url) {
      // Todo: fetch API to grab OG data
      const enocodedUrl = encodeURIComponent(url);
      Axios.get(`http://localhost:4000/ogp/${enocodedUrl}`).then((res) => {
        // console.log(res);

        // if the page is not found, set isValid to false, the card will not be shown up.
        if (res.data.error) {
          //console.log('error message:' + res.data.requestUrl);
          setLink({
            isValid: false,
          });
        } else {
          const { ogUrl, ogImage, ogTitle, ogDescription } = res.data.data;
          setLink({
            title: ogTitle ? ogTitle : "OG data not found ",
            imageUrl: ogImage.url ? ogImage.url : '',
            description: ogDescription ? ogDescription : "OG data not found ",
            linkUrl: ogUrl ? ogUrl : "OG data not found",
            isValid: true,
          });
        }
      });

      //
      //    setLink(response);
    }
  };

  const NewPostTitle = () => {
    return (
      <DialogTitle id="login-dialog-title">
        <Typography variant="h5" component="span">
          CreatePost
        </Typography>
        <CancelButton clickHandler={toggleDialog} />
      </DialogTitle>
    );
  };

  const NewPostActions = () => {
    return (
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
    );
  };

  return (
    <React.Fragment>
      <Button color="inherit" onClick={toggleDialog}>
        NEW
      </Button>
      <Dialog
        open={isDialogOpen}
        fullWidth
        maxWidth="sm"
        onClose={toggleDialog}
        aria-labelledby="login-dialog-title"
        scroll="paper"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <NewPostTitle />
        <Divider />
        <DialogContent>
          <Typography variant="h6">{userName}</Typography>

          <InputBase
            id="description"
            name="description"
            type="text"
            label="Description"
            placeholder="paste URL to browse the data "
            className={classes.textArea}
            value={newPost.memo}
            onChange={handleChange}
            fullWidth
            multiline
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
                {shortenUrl(link.linkUrl).toUpperCase()}
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

        <NewPostActions />
      </Dialog>
    </React.Fragment>
  );
};

export default NewPost;
