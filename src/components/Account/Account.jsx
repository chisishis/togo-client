import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import SubmitButton from "../common/SubmitButton";

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

const Account = ({ user, signOutStart }) => {
  const classes = useStyle();

  const lastLoggedIn = new Date().getDate();

  const { displayName = "", email = "" } = user;

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
    <Box component="form" onSubmit={handleClick} className={classes.root}>
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
      <SubmitButton text='Sign Out' fullWidth margin={0}/>
      
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userData,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
