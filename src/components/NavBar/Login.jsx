import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import DialogActions from "@material-ui/core/DialogActions";

import { connect } from 'react-redux';

import {  signInStart } from '../../redux/user/user.actions'

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "10px auto 10px auto",
  },

  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 16,
  },
  progress: {
    position: "relative",
  },
}));

const Login = ({isValid, loading, error, signInStart}) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(user)
    signInStart(user);
    if (isValid) {
      setDialogOpen(false);
    } else {
      setUser({ email: "", password: "" });
    }
  };

  const handleChange = (e) => {
    
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const ModalBody = (

  // );

  return (
    <>
      <Button color="inherit" onClick={toggleDialog}>
        Login
      </Button>
      <Dialog
        className={classes.dialog}
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="dialog-title"
        fullWidth
      >
        <DialogTitle id="dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={error.email}
            error={error.email ? true : false}
            value={user.email}
            onChange={handleChange}
            fullWidth
            autoFocus
            margin="dense"
            required
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={error.password}
            error={error.password ? true : false}
            value={user.password}
            onChange={handleChange}
            fullWidth
            required
          />
          {error.general && (
            <Typography variant="body2" className={classes.customError}>
              {error.general}
            </Typography>
          )}

          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
              disabled={error.loading}
            >
              Login
            </Button>

            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleDialogClose}
              className={classes.button}
              disabled={error.loading}
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
        {loading && (
          <CircularProgress size={30} className={classes.progress} />
        )}
      </Dialog>
    </>
  );
};

const mapDispatchToProps = dispatch =>({
  signInStart: ({email,password}) => dispatch(signInStart({email,password}))
})

const mapStateToProps = (state) => ({
  isValid: state.user.isValid,
  loading: state.user.loading,
  error: state.user.error
})

export default connect (mapStateToProps, mapDispatchToProps)(Login);
