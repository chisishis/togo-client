import React, { useState, useEffect, useMemo } from "react";

import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Popover from "@material-ui/core/Popover";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import FilterListIcon from "@material-ui/icons/FilterList";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";

import Filter from "../Menu/Filter";

import Notification from "../Menu/Notification";
import Account from "../Account/Account";

import { connect } from "react-redux";

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
    margin: theme.spacing(1),
    color: "#777",
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

  const [menu, setMenu] = useState({
    anchorEl: null,
    targetComponent: null,
    menuType: null,
    isOpen: false,
  });

  const openMenu = (event, targetComponent, menuType) => {
    setMenu({
      anchorEl: event.currentTarget,
      targetComponent: targetComponent,
      menuType,
      isOpen: true,
    });
  };

  const closeMenu = () => {
    setMenu({
      anchorEl: null,
      targetComponent: null,
      menuType: null,
      isOpen: false,
    });
  };

  const MyMenu = (props) => {
    return (
      <Popover
        elevation={3}
        getContentAnchorEl={null}
        anchorEl={menu.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={menu.isOpen}
        onClose={closeMenu}
        {...props}
      >
        {menu.targetComponent}
      </Popover>
    );
  };

  return (
    <AppBar className={classes.root} position="fixed" elevation={1}>
      <Container maxWidth="lg" disableGutters={true}>
        <Toolbar className={classes.toolbar}>
          <Button
            className={classes.button}
            startIcon={<FilterListIcon />}
            onClick={(e) => openMenu(e, <Filter />)}
            children="Filter"
          />

          <Button
            className={classes.button}
            startIcon={<NotificationsIcon />}
            onClick={(e) => openMenu(e, <Notification />)}
            children="Notification"
          />

          <Button
            className={classes.button}
            startIcon={<PersonIcon />}
            onClick={(e) => openMenu(e, <Account />)}
            children={userData.displayName}
          />

          {menu.isOpen && <MyMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  loading: state.user.loading,
});

export default connect(mapStateToProps)(Navbar);
