import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";

import { LoadingProgress } from "../common/LoadingProgress";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "200px",
    margin: theme.spacing(2),
    color: "#777",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const User = ({ user, signOutStart, loading, closeHandler }) => {
  const classes = useStyle();

  const lastLoggedIn = new Date().getDate();

  const { displayName='', email='' } = user;

  const countPosts = {
    created: 0,
    planned: 0,
    postponed: 0,
    cancelled: 0,
    completed: 0,
  };

  const handleClick = async (e) => {    
    await signOutStart();
    
  };

  return (
    <Box component='form' onSubmit={handleClick} className={classes.root}>
      <Typography variant="body1" align="center">
        {`Hi ${displayName}`}
      </Typography>
      <Typography variant="body2" align="center">
        {email}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="body2" align="left">{`Last Logged in:`}</Typography>
      <Typography
        variant="body2"
        align="left"
      >{`Nunmber of Your post:`}</Typography>
      <Typography
        variant="body2"
        align="left"
      >{`Post you were tagged:`}</Typography>
      <Divider className={classes.divider} />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        type='submit'
      >
        {"Sign Out"}
      </Button>
      {loading && <LoadingProgress />}
    </Box>
  );
};

User.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userData,
    closeHandler: ownProps.closeHandler,
    loading: state.user.loading
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
