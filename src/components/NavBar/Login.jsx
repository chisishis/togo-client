import React, { useState } from "react";
import Container from "@material-ui/core/Container";



import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import  Modal  from "@material-ui/core/Modal";
import { useAuth } from "../../contexts/user.provider";

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
  const auth = useAuth();
  const authErrors = auth.errors;
  const authUser = auth.user;


  const [user, setUser] = useState({
    email: "",
    password: ""   
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
    auth.login(email, password)
    if (authUser.isValid) {      
      setModalOpen(false);
    } else {
      setUser({email:'', password:''})
    }
  };

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value });
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
          helperText={authErrors.email}
          error={authErrors.email ? true : false}
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
          helperText={authErrors.password}
          error={authErrors.password ? true : false}
          value={user.password}
          onChange={handleChange}
          fullWidth
        />
        {authErrors.general && (
          <Typography variant="body2" className={classes.customError}>
            {authErrors.general}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={authUser.loading}
        >
          Login
          {authUser.loading && (
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