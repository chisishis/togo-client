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

import { connect } from "react-redux";
import { signInStart } from "../../redux/user/user.actions";

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

const Login = ({ loading, error, signInStart, closeHandler }) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    signInStart(user);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle id="dialog-title">Login</DialogTitle>
    
      <DialogContent>
       
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          className={classes.textField}
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
          value={user.password}
          onChange={handleChange}
          fullWidth
          required
        />
        {Boolean(error) && (
          <Typography variant="body2" className={classes.customError}>
            {error}
          </Typography>
        )}

        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"            
            className={classes.button}
            disabled={loading}
          >
            Login
          </Button>

          <Button
            type="button"
            variant="contained"
            color="primary"            
            className={classes.button}
            disabled={loading}
            onClick={closeHandler}
          >
            Cancel
          </Button>
        </DialogActions>
        {loading && <CircularProgress size={30} className={classes.progress} />}
      </DialogContent>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: ({ email, password }) =>
    dispatch(signInStart({ email, password })),
});

const mapStateToProps = (state) => ({
  isValid: state.user.isValid,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
