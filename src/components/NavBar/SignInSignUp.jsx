import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


import { makeStyles } from "@material-ui/core/styles";

import Login from './Login'
import Signup from './Signup'


import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  dialog: {
    fontSize: theme.typography.h4,

    margin: "50px 10px 10px 10px",
    "& > h4": {
      fontWeight: 100,
    },
  },
}));

const SignInSignUp = ({ closeHandler, ...props }) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.dialog} component="div" {...props}>
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
      <DialogContent>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Sign In" id='login-tab'/>
          <Tab label="Sign Up" id='sign-up-tab' />
        </Tabs>
        <Login value={value} index={0} closeHandler={closeHandler}/>
        <Signup value={value} index={1} closeHandler={closeHandler}/>
        
      </DialogContent>
      
      {/* <Login value={value} index={1} closeHandeler={closeHandeler}/> */}
    </Box>
  );
};

SignInSignUp.propTypes = {};

export default SignInSignUp;
