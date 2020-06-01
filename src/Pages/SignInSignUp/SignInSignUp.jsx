import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

import Signin from "../../components/SignIn/Signin";
import Signup from "../../components/SignUp/Signup";




const useStyles = makeStyles((theme) => ({
  root: {
   
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: '100%',
    
  },

  signContainer : {
    fontSize: theme.typography.h4,
    marginBottom: '100px',
    padding: theme.spacing(3) ,
    backgroundColor: "#fff",  
    borderRadius : '8px',


    "& > h4": {
      fontWeight: 100,
    },

  }
}));

const SignInSignUp = ({ closeHandler }) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root} component="section">
      <Container  className={classes.signContainer} maxWidth='sm'>
      
      <Typography
        variant="h4"
        align="center"
        gutterBottom={true}
        component="h4"
      >
        Welcome!
      </Typography>
      <Typography
        variant="h6"
        align="center"
        gutterBottom={true}
        component="h4"
      >
        Please sign in or sign up
      </Typography>

      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Sign In" id="login-tab" />
        <Tab label="Sign Up" id="sign-up-tab" />
      </Tabs>
      <Signin value={value} index={0} closeHandler={closeHandler} />
      <Signup value={value} index={1} closeHandler={closeHandler} />
      </Container>
    </Box>
  );
};

export default SignInSignUp;
