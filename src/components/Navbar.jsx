import React, { useState } from "react";
import { makeStyles, fade } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Login from './Login';

import { useAuth } from '../contexts/user.provider'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {},
  user: {
    flexGrow: 1,
  },
  menu: {
    flexGrow: 1,
    textAlign: "right",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  
  
  const userAuth = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  

  const isMenuOpen = Boolean(anchorEl);

  const handleStatusMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setAnchorEl(null);
  };

  
  
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Container maxWidth="lg" disableGutters={true}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.user}>
              <Typography variant="body1">Howdy {userAuth.user.userName}</Typography>
            </div>
            <div className={classes.menu}>
              <Button color="inherit">new</Button>

              <Button
                aria-label="Select status of Items"
                aria-haspopup="true"
                onClick={handleStatusMenuOpen}
                color="inherit"
              >
                Status
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={isMenuOpen}
                onClose={handleStatusMenuClose}
              >
              <MenuItem onClick={handleStatusMenuClose}>All</MenuItem>
                <MenuItem onClick={handleStatusMenuClose}>Created</MenuItem>
                <MenuItem onClick={handleStatusMenuClose}>Scheduled</MenuItem>
                <MenuItem onClick={handleStatusMenuClose}>Completed</MenuItem>
                <MenuItem onClick={handleStatusMenuClose}>Postponed</MenuItem>
                <MenuItem onClick={handleStatusMenuClose}>Cancelled</MenuItem>
              </Menu>
              {userAuth.user.isValid? <Button color="inherit" onClick={userAuth.logout} >Logout</Button>: <Login/>}  
             
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
