import React from "react";

import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';

import { makeStyles } from "@material-ui/core";




const ConfirmButton = ({
  clickHandler,
  message,
  name
}) => {

    const classes = makeStyles({

    });

  return (
<DialogActions >
      <Button
        name={name}
        onClick={clickHandler}
        variant='contained'
        color="secondary"
      >
        {message}
      </Button>
      <Button
       
        name="cancel"
        onClick={clickHandler}
        color="secondary"
        autoFocus
      >
        Cancel
      </Button>
      </DialogActions>
  );
};

ConfirmButton.protoType = {
    clickHandler: PropTypes.func.isRequired,
    message: PropTypes.oneOf(['Save','Update','Delete']).isRequired,
    name: PropTypes.string.isRequired
}

export default ConfirmButton;
