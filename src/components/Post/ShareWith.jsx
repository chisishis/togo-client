import React, { useState } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Menu from "@material-ui/core/Menu";

import MenuItem from "@material-ui/core/MenuItem";

import UserSelectDialog from "../UserSelectDialog/UserSelectDialog";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import GroupIcon from "@material-ui/icons/Group";
import { useUsers } from "../../contexts/UsersProvider";

import { useDispatch } from "react-redux";
import { updatePostStart } from "../../redux/posts/posts.actions";
import { useUpdatedPostCollection } from "../../hooks/useUpdatedPostCollection";

const TrimmedButton = ({ array, clickHandler }) => {
  const users = useUsers();
  const [icon, text] = users.ShortenedArray(array);

  return (
    <Button
      color="secondary"
      startIcon={React.createElement(icon)}
      children={text}
      onClick={clickHandler}
    />
  );
};

const ShareWith = ({ sharedUserArray, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setDialog] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const updatedPostCollectionWithIndex =  useUpdatedPostCollection(id, 'shareWith' , selectedUsers);

  const dispatch = useDispatch(); 


  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openDialog = () => {
    closeMenu();
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  const changeToPublic = () => {
    setSelectedUsers(['999999'])
    console.log(updatedPostCollectionWithIndex)
    dispatch(updatePostStart(updatedPostCollectionWithIndex));    
    setDialog(false);
  }


  const changeToPrivate = () => {
    setSelectedUsers(['000000'])
    console.log(updatedPostCollectionWithIndex)
    dispatch(updatePostStart(updatedPostCollectionWithIndex));    
    setDialog(false);
  }

  return (
    <React.Fragment>
      <TrimmedButton
        array={sharedUserArray}
        clickHandler={openMenu}
      ></TrimmedButton>

      <Menu
        id="share-change"
        aria-label="Change Share Settings"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={changeToPrivate}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Only Me</Typography>
        </MenuItem>

        <MenuItem onClick={changeToPublic}>
          <ListItemIcon>
            <PublicIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Eveyone</Typography>
        </MenuItem>

        <MenuItem onClick={openDialog}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Share With..</Typography>
        </MenuItem>
      </Menu>
      {
        isDialogOpen &&  <UserSelectDialog
        sharedUserArray={sharedUserArray}
        openHandler={isDialogOpen}
        closeHandler={closeDialog}
        id= {id}        
      />
      }
     
    </React.Fragment>
  );
};

ShareWith.protoType = {
  sharedUserArray: PropTypes.array.isRequired,
  index: PropTypes.string.isRequired
};

export default ShareWith;
