import React from "react";

import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { useDialogSize } from "../../hooks/useDialogSize";

import AbsoluteCancelIcon from "./AbsoluteCanceIIcon";

const ConfirmDialog = ({
  open,
  dialogTitle,
  dialogMessage,
  confirmHandler,
  confirmMessage,
  cancelHandler,
  dividers
}) => {
  const dialogSize = useDialogSize();
  return (
    <Dialog
      open={open}
      fullWidth={dialogSize}
      fullScreen={!dialogSize}
      onClose={cancelHandler}
    
    >
      <DialogTitle>
        <AbsoluteCancelIcon clickHandler={cancelHandler} />
        {dialogTitle}
      </DialogTitle>
      <DialogContent   dividers = {dividers}>
        <DialogContentText>{dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler} color="secondary" children={"cancel"} />

        <Button
          onClick={confirmHandler}
          color="secondary"
          variant="contained"
          children={confirmMessage}
        />
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.defaultProps = {
  confirmMessage: "Confirm",
  deviders: "true"
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogMessage: PropTypes.string.isRequired,
  confirmHandler: PropTypes.func.isRequired,
  confirmMessage: PropTypes.string,
  cancelHandler: PropTypes.func.isRequired,
  dividers : PropTypes.bool
};

export default ConfirmDialog;
