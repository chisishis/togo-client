import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LabelIcon from "@material-ui/icons/Label";

const PostActionMenuItem = ({text, openHandler}) => (
    <MenuItem onClick={openHandler}>
    <ListItemIcon>
      <LabelIcon fontSize="small" />
    </ListItemIcon>
    <ListItemText primary={text} />
  </MenuItem>
)

export default PostActionMenuItem;

