import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";


import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.backdrop,
  },
}));

const StatusMessageBar = ({ type, message }) => {
  const classes = useStyles();

  const duration = 5000;

  const [open, setOpen] = useState(true);

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      className={classes.backdrop}
      open={open}
      autoHideDuration={5000}
      onClose={closeSnackbar}
    >
      <Alert severity={type} variant="filled" onClose={closeSnackbar}>
        {message}
      </Alert>
    </Snackbar>
  );
};



export default StatusMessageBar;
