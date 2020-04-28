import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { makeStyles, Divider } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputBase from "@material-ui/core/InputBase";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import { isUrl } from "../../util/validUrl";

import CancelButton from "./CancelButton";

import { useAuth } from "../../contexts/user.provider";

import Axios from "axios";
import fetchMeta from "../../util/fetch.meta.data";

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

const getSteps = () => ["Create a post", "Make a plan"];
const getStepContent = (step) => {
  switch (step) {
    case 0:
      return "Automatically Created";
    case 1:
      return "Pick a date for the plan. You can go back to step-1 if you do not want to make a plan now";
    default:
      return "Unknown Step";
  }
};

const NewPost = () => {
  const classes = useStyles();
  const auth = useAuth();
  const authErrors = auth.errors;
  const authUser = auth.user;
  const steps = getSteps();

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
    url: "",
    title: "",
    description: "",
    pictureUrl: "",
    status: "created",
    inputText: "",
    dates: {
      created: new Date().toDateString(),
      planned: "",
      postponed: "",
      cancelled: "",
      completed: "",
    },
    tag: [],
  });

  const [activeStep, setActiveStep] = useState();

  const [link, setLink] = useState({
    url: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = async (e) => {
    const inputText = e.target.value;
    const inputFragment = inputText.split(" ");
    const result = inputFragment.filter((sentence) => isUrl(sentence))[0];

    if (result && !link.url) {
      // Todo: fetch API to grab OG data
      const response = await fetchMeta(result);
      setLink(response);
    }
    setPost({ ...post, inputText: inputText });
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
            value={post.inputText}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
            rowsMax={6}
            required
            autoFocus
          />
        </DialogContent>

        <Card className={classes.link}>
          <CardMedia
            className={classes.media}
            component="img"
            alt="link image"
            image={link.imageUrl}
            title={link.title}
          />
          <CardContent>
            <Typography className={classes.url} variant="body2" align="left">
              {link.url.toUpperCase()}
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

        <NewPostActions />
      </Dialog>
    </React.Fragment>
  );
};

export default NewPost;
