import React from "react";
import PropTypes from "prop-types";

import DialogTitle from "@material-ui/core/DialogTitle";

const MyDialogTitle = ({ type, text, id }) => {
  return <DialogTitle id={id}>{text}</DialogTitle>;
};

MyDialogTitle.propTypes = {
  type: PropTypes.oneOf(["warning", "info"]).isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default MyDialogTitle;
