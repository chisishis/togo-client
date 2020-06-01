import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Tag from "./Tag";

const Tags = ({ tags }) => {
  return (
    <Typography align="right" variant="body2" color="textSecondary">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </Typography>
  );
};

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
};
export default Tags;
