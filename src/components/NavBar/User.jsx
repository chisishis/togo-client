import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";


import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({

    root: {
        width: '200px',
        margin: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }

}));

const User = ({ name="Please Login," , email= "or Create New Account" }) => {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Typography variant="body2" align='center'> {name} </Typography>
      <Typography variant="body2" align='center'>{email} </Typography>
      <Divider className={classes.divider}/>
      
    </Box>
  );
};

User.propTypes = {};

const countPosts = {
  created: 0,
  planned: 0,
  postponed: 0,
  cancelled: 0,
  completed: 0,
};

const lastLoggedIn = new Date().getDate();

const mapStateToProps = (state) => {
  return {
    name: state.user.userName,
    eamil: state.user.email,
  };
};

export default connect(mapStateToProps, null)(User);
