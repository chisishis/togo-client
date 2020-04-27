import React from 'react'

import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";


import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({ 
    cancelIcon: {
      position: "absolute",
      top: 6,
      right: 24,
      textAlign: "right",
    },
  }));


const CancelButton = ({ clickHandler }) => {
    const classes = useStyles();
    return (
      <IconButton className={classes.cancelIcon} aria-label="close-dialog" onClick={clickHandler}>
        <CancelIcon
          fontSize="large"
          style={{ color: "#aaa" }}
          
        />
      </IconButton>
    );
  };

  export default CancelButton;