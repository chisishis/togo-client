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

import { isUrl } from "../../util/validUrl";

import CancelButton from "./CancelButton";

import { useAuth } from "../../contexts/user.provider";

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

const NewPost = () => {
  const classes = useStyles();
  const auth = useAuth();
  const authUser = auth.user;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState({
    url: "",
    title: "",
    description: "",
    dates: "",
  });

  const [post, setPost] = useState({
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
    //console.log(post, link);
    console.log({...post, ...link})
    auth.post({...post,...link});
  };

  const shortenUrl = (longUrl) => {
    const result = longUrl
      .split("/")
      .filter((fragment) => fragment.includes("."))[0];

    // console.log(result);

    return result;
  };

  const handleChange = (e) => {
    const memo = e.target.value;
    const inputFragment = memo.split(" ");
    const result = inputFragment.filter((sentence) => isUrl(sentence))[0];
    setPost({ ...post, memo: memo });

    if (result) {
      // Todo: fetch API to grab OG data
      const enocodedUrl = encodeURIComponent(result);
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
            imageUrl: ogImage.url,
            description: ogDescription ? ogDescription : "OG data not found ",
            linkUrl: ogUrl ? shortenUrl(ogUrl) : shortenUrl(enocodedUrl),
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
          <Typography variant="h6">{authUser.userName}</Typography>

          <InputBase
            id="description"
            name="description"
            type="text"
            label="Description"
            className={classes.textArea}
            error={errors.description ? true : false}
            value={post.memo}
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
                {link.linkUrl.toUpperCase()}
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
