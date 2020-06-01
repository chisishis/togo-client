import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
/**
 * Renders Submit Button with primary color and a given text
 *
 * @param text - Text to be rendered in button component
 */
const SubmitButton = ({ text, margin, ...props }) => {
  return (
    <Button
      style={{ marginTop: 10*margin }}
      type="submit"
      variant="contained"
      color="primary"
      {...props}
      children={text}
    />
  );
};

SubmitButton.protoType = {
 
  text: PropTypes.oneOf(['Save','Update','Delete']).isRequired,
  name: PropTypes.string.isRequired
}




export default SubmitButton;
