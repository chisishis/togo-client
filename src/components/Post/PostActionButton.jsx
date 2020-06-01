import React from "react";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

const CardActionButton = () => (
  <IconButton
    aria-label="settings"
    name="delete-post"
    // onClick={handleMoreMenu}
  >
    <MoreVertIcon />
  </IconButton>
);

export default CardActionButton;
