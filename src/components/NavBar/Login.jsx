import React, { useState } from "react";
import Container from "@material-ui/core/Container";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import DialogActions from "@material-ui/core/DialogActions";

import { useAuth } from "../../contexts/user.provider";

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
    position: "absolute",
  },
}));

const Login = () => {
  const classes = useStyles();
  const auth = useAuth();
  const authErrors = auth.errors;
  const authUser = auth.user;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen)
  }



  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = user;
    auth.login(email, password);
    if (auth.isValid) {
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
      className = {classes.dialog}
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="dialog-title"
        fullWidth        
      >
        <DialogTitle id="dialog-title" >Login</DialogTitle>
        <DialogContent>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={authErrors.email}
            error={authErrors.email ? true : false}
            value={user.email}
            onChange={handleChange}
            fullWidth
            autoFocus
            margin='dense'
            required
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={authErrors.password}
            error={authErrors.password ? true : false}
            value={user.password}
            onChange={handleChange}
            fullWidth
            required
          />
          {authErrors.general && (
            <Typography variant="body2" className={classes.customError}>
              {authErrors.general}
            </Typography>
          )}

          <DialogActions>
            
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            disabled={authUser.loading}
            >
            Login
            
            </Button>

            <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleDialogClose}
            className={classes.button}
            disabled={authUser.loading}
            >
            Cancel
        
            </Button>
            
            </DialogActions>
          
       
            </DialogContent>
            {authUser.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
            
      </Dialog>
      </>
  );
};

export default Login;
