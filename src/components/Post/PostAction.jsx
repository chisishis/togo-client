import React, { useState } from "react";

import Menu from "@material-ui/core/Menu";

import ScheduleIcon from "@material-ui/icons/Schedule";
import DeleteIcon from "@material-ui/icons/Delete";

import EditTag from "../EditTag/EditTag";
import EditMemo from "../EditMemo/EditMemo";
import DeletePost from "../DeletePost/DeletePost";

import PostActionButton from "./PostActionButton";


import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LabelIcon from "@material-ui/icons/Label";

const PostAction = ({ postId, tags, memo }) => {
  const [anchorEl, setAnchorEl] = useState(null); // Side Menu Elements
  const [dialog, setDialog] = useState(null);

  const openDialog = (name) => () => {
    closeMenu();
    switch (name) {
      case "tag":
        setDialog("tag");
        return;
      case "memo":
        setDialog("memo");
        return;
      case "delete":
        setDialog("delete");
        return;
      default:
        return;
    }
  };

  const closeDialog = () => {
    setDialog(null);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <PostActionButton onClick={handleMenu} />
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={openDialog("tag")}>
          <ListItemIcon>
            <LabelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={"Edit Tag"} />
        </MenuItem>

        <MenuItem onClick={openDialog("memo")}>
          <ListItemIcon>
            <LabelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={"Edit Memo"} />
        </MenuItem>

        <MenuItem onClick={openDialog("delete")}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={"Delete Post"} />
        </MenuItem>

        <EditTag
          open={dialog === "tag"}
          closeHandler={closeDialog}
          tags={tags}
          postId={postId}
        />
        <EditMemo
          open={dialog === "memo"}
          closeHandler={closeDialog}
          memo={memo}
          postId={postId}
        />
        <DeletePost open={dialog === "delete"} closeHandler={closeDialog} postId={postId} />
      </Menu>
    </div>
  );
};

export default PostAction;
