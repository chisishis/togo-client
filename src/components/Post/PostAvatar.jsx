import React from "react";
import Avatar from "@material-ui/core/Avatar";

const PostAvatar = ({ name }) => {
  return <Avatar aria-label="User Avatar" children={name} />;
};

export default PostAvatar;
