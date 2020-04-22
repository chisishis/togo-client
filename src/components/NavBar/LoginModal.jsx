import React, { useState } from "react";

// MUI
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Custom Hooks with context
import { useAuth } from "../../contexts/user.provider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 200,
    textAlign: "center",
    backgroundColor: "#eef",
    padding: 50,
  },

  image: {
    maxWidth: 64,
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
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

const LoginModal = () => {
  const classes = useStyles();
  const userAuth = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    userAuth.login(email, password);
  };

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value });
  };

  return (
    <Container
      
      maxWidth="sm"
      disableGutters={true}
      className={classes.formControl}
    >
      <Typography className={classes.pageTitle} variant="h2">LOGIN</Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          className={classes.textField}
          helperText={userAuth.errors.email}
          error={userAuth.errors.email ? true : false}
          value={user.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          className={classes.textField}
          helperText={userAuth.errors.password}
          error={userAuth.errors.password ? true : false}
          value={user.password}
          onChange={handleChange}
          fullWidth
        />
        {userAuth.errors.general && (
          <Typography variant="body2" className={classes.customError}>
            {userAuth.errors.general}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={user.loading}
        >
          Login
          {user.loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </Button>
      </form>
    </Container>
  );
};

export default LoginModal;
