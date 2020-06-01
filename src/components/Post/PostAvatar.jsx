import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default ({ displayName }) => {
  const avatarChildren = String(displayName).toUpperCase()[0];
  return <Avatar aria-label="Post Avatar" children={avatarChildren} />;
};
