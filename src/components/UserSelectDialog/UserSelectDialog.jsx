import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import MyDialogTitle from "../common/MyDialogTitle";

import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

import ListItem from "@material-ui/core/ListItem";
import PostAvatar from "../Post/PostAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SubmitButton from "../common/SubmitButton";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useUsers } from "../../contexts/UsersProvider";
import { updatePostStart } from "../../redux/posts/posts.actions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useUpdatedPostCollection } from "../../hooks/useUpdatedPostCollection";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const UserSelectDialog = ({ openHandler, closeHandler, sharedUserArray, id }) => {
  // if sharedUserArray is 999999
  // if sharedUserArray is 000000

  const users = useUsers();
  const classes = useStyles();
  const dispatch = useDispatch(); 

  const usersIndexArray = users.usersIndexArray();
  const isArrayPublicOrOnlyMe =
    sharedUserArray.includes("000000") || sharedUserArray.includes("999999");

  const unselectedUserArray = usersIndexArray.reduce((acc, user) => {
    if (sharedUserArray.includes(user)) return acc;
    else return [...acc, user];
  }, []);

  const initialSelectedUsers = isArrayPublicOrOnlyMe ? null : sharedUserArray;
  const initialUnselectedUsers = isArrayPublicOrOnlyMe
    ? usersIndexArray
    : unselectedUserArray;

  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers);
  const [unselectedUsers, setUnselectedUsers] = useState(
    initialUnselectedUsers
  );



  const deletePerson = (user) => () => {
    const filteredPerson = selectedUsers.filter((userId) => userId !== user);
    setSelectedUsers(filteredPerson);
    setUnselectedUsers([...unselectedUsers, user]);
  };

  const addPerson = (user) => () => {
    const filteredPerson = unselectedUsers.filter((userId) => userId !== user);
    setSelectedUsers([...selectedUsers, user]);
    setUnselectedUsers(filteredPerson);
  }

  const revertValues = () => {
    setSelectedUsers(initialSelectedUsers);
    setUnselectedUsers(initialUnselectedUsers);
  };
  const updatedPostCollectionWithIndex =  useUpdatedPostCollection(id, 'shareWith' , selectedUsers)

  const updateUsers =  (e) => {    

    e.preventDefault();      
    dispatch (updatePostStart(updatedPostCollectionWithIndex))
    closeHandler();
    
  }

  return (
    <Dialog
      open={openHandler}
      fullWidth
      keepMounted={false}
      onClose={closeHandler}
      onExited={revertValues}
    >
      <Box component='form' onSubmit={updateUsers}>
      <MyDialogTitle type="info" text="Select Users.." />
      <DialogContent dividers>
        <Box className={classes.root}>
          {Boolean(selectedUsers) &&
            selectedUsers.map((user) => {
              const name = users.getDisplayName(user);
              return (
                <Chip
                  key={user}
                  name={user}
                  label={name}
                  onDelete={deletePerson(user)}
                  variant="outlined"
                  color="secondary"
                />
              );
            })}
        </Box>

        <List>
          {unselectedUsers.map((user, index) => {
            const name = users.getDisplayName(user);
            return (
              <ListItem
                key={user}
                dense
                button
                onClick={addPerson(user)}
              >
                <ListItemIcon>
                  <PostAvatar name={name[0]} />
                </ListItemIcon>
                <ListItemText primary={name}></ListItemText>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <SubmitButton fullWidth text="Save"></SubmitButton>
      </DialogActions>
      </Box>
    </Dialog>
  );
};

UserSelectDialog.propTypes = {};

export default UserSelectDialog;
