import React, { useState } from "react";

import { makeStyles, Dialog } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

import Container from "@material-ui/core/Container";
import Menu from "@material-ui/core/Menu";

import FilterListIcon from "@material-ui/icons/FilterList";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";

import Login from "./Login";
import Filter from "./Filter";
import Greetings from "./Greetings";
import NewPost from "./NewPost";
import Notification from "./Notification";
import User from "./User";

import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    color: "#444",
  },
  toolbar: {
    justifyContent: "flex-end",
  },
  button: {
    margin: theme.spacing(0),
  },
}));

/**
 *
 * Top Naviagtion Bar
 * @param {tokenss} token ds
 * @param token sss
 */
const Navbar = ({ userData }) => {
  const classes = useStyles();

  const [anchor, setAnchor] = useState(null);

  const handleMenuOpen = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const isMenuOpen = (name) => {
    if (Boolean(anchor)) {
      if (anchor.id.split("-")[0] === name) {
        return true;
      } else return false;
    }
    return false;
  };

  return (
    <AppBar className={classes.root} position="fixed" elevation={1}>
      <Container maxWidth="lg" disableGutters={true}>
        <Toolbar className={classes.toolbar}>
          {/* <Greetings className={classes.userGreetings}/>          */}

          <IconButton
            id="new-button"
            className={classes.button}
            onClick={handleMenuOpen}
            children={<AddIcon />}
          />
          <IconButton
            id="filter-button"
            className={classes.button}
            onClick={handleMenuOpen}
            children={<FilterListIcon />}
          />
          <IconButton
            id="notification-button"
            className={classes.button}
            onClick={handleMenuOpen}
            children={<NotificationsIcon />}
          />

          <IconButton
            id="user-button"
            className={classes.button}
            onClick={handleMenuOpen}
            children={<PersonIcon />}
          />

          <Popover
            elevation={3}
            getContentAnchorEl={null}
            anchorEl={anchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={isMenuOpen("filter")}
            onClose={handleMenuClose}
          >
            <Filter />
          </Popover>

          <Popover
            elevation={3}
            getContentAnchorEl={null}
            anchorEl={anchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={isMenuOpen("notification")}
            onClose={handleMenuClose}
          >
            <Notification />
          </Popover>

          {Boolean(userData) ? (
            <Popover
              elevation={3}
              getContentAnchorEl={null}
              anchorEl={anchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={isMenuOpen("user")}
              onClose={handleMenuClose}
            >
              <User />
            </Popover>
          ) : (
            <Dialog
              open={isMenuOpen("user")}
              onClose={handleMenuClose}
              fullWidth
            >
              <Login closeHandler={handleMenuClose}/>
            </Dialog>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps, null)(Navbar);
