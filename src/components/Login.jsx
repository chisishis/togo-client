import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import  Modal  from "@material-ui/core/Modal";
import { useAuth } from "../contexts/user.provider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 200,
    textAlign: "center",
    backgroundColor:'#eef',
    padding: 50
  },
  modal: {
    position: 'absolute',
    width: 400
  },
  form: {
    textAlign: "center",
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
    position: 'relative'
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 16,
  },
  progress: {
      position: 'absolute'
  }

}));

const Login = () => {
  const classes = useStyles();
  const userAuth = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {email, password} = user;
    userAuth.login(email, password)
    if (userAuth.user.isValid) {
      console.log('oki')
      setModalOpen(false);
    }    
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const ModalBody = (
    <Container
      maxWidth="sm"
      disableGutters={true}
      className={classes.formControl}
    >
      <Typography variant="h2">LOGIN</Typography>
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
        {user.errors.general && (
          <Typography variant="body2" className={classes.customError}>
            {user.errors.general}
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

  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleModalOpen}>
        Login
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="Login"
      >
        {ModalBody}
      </Modal>
    </React.Fragment>
  );
};

export default Login;
