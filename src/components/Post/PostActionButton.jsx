import React from "react";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";


const PostActionButton = (props) => (
  
  <IconButton
    aria-label="settings"
    name="delete-post"
    size='medium'
    {...props}
  >
    <MoreVertIcon />
  </IconButton>

);

export default PostActionButton;
