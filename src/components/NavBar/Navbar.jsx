import React from "react";
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";


import Container from "@material-ui/core/Container";

import Box from "@material-ui/core/Box";

import Login from "./Login";
import FilterMenu from "./FilterMenu";
import Greetings from "./Greetings";
import NewPost from "./NewPost";
import Search from "./Search";
import { useAuth } from "../../contexts/user.provider";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menu: {
    flexGrow: 1,
    textAlign: "right",
  },
  userGreetings: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const userAuth = useAuth();
  
  
  return (
    <AppBar className={classes.root} position="fixed">
      <Container maxWidth="lg" disableGutters={true}>
        <Toolbar className={classes.toolbar}>
          <Greetings className={classes.userGreetings}/>
          <Box component="span" className={classes.menu}>
            <NewPost />
            <FilterMenu />    
            {userAuth.user.isValid? <Button color="inherit" onClick={userAuth.logout} >Logout</Button>: <Login/>}   
           
            
          </Box>
          <Search />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
