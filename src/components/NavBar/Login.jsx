import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { makeStyles, Tabs } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";

import DialogActions from "@material-ui/core/DialogActions";

import { connect } from "react-redux";
import { signInStart } from "../../redux/user/user.actions";
import { errorParser } from "../../util/firebase/error-handler";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 20,
  },
  textField: {
    margin: "10px auto 10px auto",
  },

  progress: {
    position: "relative",
  },
}));

const Login = ({
  loading,
  error,
  signInStart,
  closeHandler,
  value,
  index,
  userData,
  ...props
}) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInStart(user);
    Boolean(userData) && closeHandler();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box
      role="tabpanel"
      hidden={value != index}
      className={classes.form}
      component="form"
      onSubmit={handleSubmit}
      id="login-form"
      {...props}
    >
      <TextField
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
        <Typography
          align="center"
          color="error"
          gutterBottom={"true"}
          variant="body2"
          className={classes.customError}
        >
          {errorParser(error)}
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
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: ({ email, password }) =>
    dispatch(signInStart({ email, password })),
});

const mapStateToProps = (state, ownProps) => ({
  loading: state.user.loading,
  error: state.user.error,
  closeHandler: ownProps.closeHandler,
  value: ownProps.value,
  index: ownProps.index,
  props: ownProps.props,
  userData: state.user.userData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
