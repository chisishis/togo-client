import React, { useState } from "react";

import Menu from "@material-ui/core/Menu";

import ScheduleIcon from "@material-ui/icons/Schedule";
import DeleteIcon from "@material-ui/icons/Delete";

import EditTag from '../EditTag/EditTag'
import EditMemo from '../EditMemo/EditMemo'
import DeletePost from '../DeletePost/DeletePost'

import PostActionButton from "./PostActionButton";

import PostActionMenuItem from "./PostActionMenuItem";

const PostAction = () => {

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
        <PostActionMenuItem
          text="Edit Tag"
          openHandler={openDialog("tag")}
          closeHandler={closeDialog}
        />
        <PostActionMenuItem
          text="Edit Memo"
          openHandler={openDialog("memo")}
          closeHandler={closeDialog}
        />
        <PostActionMenuItem
          text="Delete Post"
          openHandler={openDialog("delete")}
          closeHandler={closeDialog}
        />

        <EditTag open={dialog === 'tag'} closeHandler={closeDialog} />
        <EditMemo open={dialog === 'memo'} closeHandler={closeDialog} />
        <DeletePost open={dialog === 'delete'} closeHandler={closeDialog} />


      </Menu>

      
    </div>
  );
};

export default PostAction;
