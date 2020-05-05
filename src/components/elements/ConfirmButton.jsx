import React from "react";

import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';


const ConfirmButton = ({
  cancelHandler,
  clickHandler,
  message,
  name
}) => {

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
        onClick={cancelHandler}
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
    cancelHandler: PropTypes.func.isRequired,
    message: PropTypes.oneOf(['Save','Update','Delete']).isRequired,
    name: PropTypes.string.isRequired
}

export default ConfirmButton;
