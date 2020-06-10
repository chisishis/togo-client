import React from "react";
import PropTypes from "prop-types";

import DialogTitle from "@material-ui/core/DialogTitle";


import { makeStyles } from "@material-ui/core/styles";




const useStyles = makeStyles(theme =>({
  
  general : {
    backgroundColor: '#2196f3',
    color: '#fff'
  },

  warning : {
    backgroundColor: '#ff5722'
  },

  default : {
    backgroundColor: 'inherit'
  }


}))


const MyDialogTitle = ({ type, text, id }) => {

  const classes = useStyles()

  const titleType = () => {
    switch (type) {
      case 'general' : return classes.general
    
    case 'warning' : return classes.warning;
    default : return classes.default
  } 
}

  return <DialogTitle className={titleType()} id={id}>{text}</DialogTitle>;
};

MyDialogTitle.propTypes = {
  type: PropTypes.oneOf(["warning", "info"]).isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default MyDialogTitle;
