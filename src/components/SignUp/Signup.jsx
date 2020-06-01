import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";

import { errorParser } from "../../util/firebase/error-handler";
import SubmitButton from "../common/SubmitButton";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 20,
  },
  textField: {
    margin: "10px auto 10px auto",
  },
}));

const Signup = ({
  loading,
  error,
  signUpStart,
  closeHandler,
  value,
  index,

}) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpStart(user);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      className={classes.form}
      component="form"
      onSubmit={handleSubmit}
      id="signup-form"
 
    >
      <TextField
        name="displayName"
        type="text"
        label="User Name"
        className={classes.textField}
        value={user.displayName}
        onChange={handleChange}
        fullWidth
        autoFocus
        required
      />
      <TextField
        name="email"
        type="email"
        label="Email"
        className={classes.textField}
        value={user.email}
        onChange={handleChange}
        fullWidth
        autoFocus
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

      <Typography
        align="center"
        color="error"
        gutterBottom={true}
        variant="body2"
      >
        {errorParser(error)}
      </Typography>

      <SubmitButton text="Sign Up" fullWidth margin={3} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: ({ email, password, displayName }) =>
    dispatch(signUpStart({ email, password, displayName })),
});

const mapStateToProps = (state, ownProps) => ({
  loading: state.user.loading,
  error: state.user.error,
  closeHandler: ownProps.closeHandler,
  value: ownProps.value,
  index: ownProps.index,
  props: ownProps.props,
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
