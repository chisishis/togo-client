import React from "react";
import { makeStyles } from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  tag: {
    color: blueGrey[500],
    backgroundColor: "none",
    "&:hover": {
      color: blueGrey[700],
      "@media (hover : none)": {
        color: blueGrey[700],
      },
    },
    margin: theme.spacing(0),
  },
}));

const Tag = ({ tag }) => {
  const classes = useStyles();
  return (
    <Button
      size="small"
      key={tag}
      className={classes.tag} /*onClick={()=>searchTag(tagItem)}*/
    >
      {tag}
    </Button>
  );
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Tag;
