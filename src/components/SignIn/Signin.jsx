import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";
import { signInStart } from "../../redux/user/user.actions";
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

const Signin = ({ error, signInStart, closeHandler, value, index }) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInStart(user);
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
      id="login-form"
      
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
     
        <Typography
          align="center"
          color="error"
          gutterBottom={true}
          variant="body2"
        >
          {errorParser(error)}
        </Typography>
      
        <SubmitButton text="Sign In" fullWidth margin={3} />
      
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (userCredential) => dispatch(signInStart(userCredential)),
});

const mapStateToProps = (state, ownProps) => ({
  error: state.user.error,
  closeHandler: ownProps.closeHandler,
  value: ownProps.value,
  index: ownProps.index,
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
