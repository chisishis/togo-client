import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";

//MUI Components
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LabelIcon from "@material-ui/icons/Label";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';
import PeopleIcon from '@material-ui/icons/People';


// Utils
import { convertDate } from "../../util";
import dayjs from "dayjs";

// Context Consumers



// Custom Components
import Tag from "./Tag";
import Status from "./PostStatus";
import ConfirmButton from "../common/ConfirmButton";
import PostActionArea from "./PostActionArea";
import PostAvatar from './PostAvatar'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: "100%",
    borderRadius: 8,
  },

  memo: {
    overflowWrap: "break-word",
  },
  name: {
    margin: "0px 5px 5px 2px",
  },

  chiproot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Post = ({ post }) => {
  // Destruct Post item
 
  const classes = useStyles();
  return (<div/>)
}


  // local states
  const [anchorEl, setAnchorEl] = useState(null); // Side Menu Elements
  const [inputTag, setInputTag] = useState("");
  const [inputMemo, setInputMemo] = useState(memo);
  const [tempTag, setTempTag] = useState(tag); // states from database
  const [isOpen, setOpen] = useState({
    // states for Side Menu
    tag: false,
    status: false,
    delete: false,
    memo: false,
  });

  // Controls Side Menu
  const handleMoreMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMoreMenu = () => {
    setAnchorEl(null);
  };

  const handleUpdate = (target) => () => {
    switch (target) {
      case "tag": {
        updateTag(postId, userToken, tempTag);
        break;
      }
      case "delete": {
        deletePost(postId, userToken);
        break;
      }
      case "memo": {
        updateMemo(postId, userToken, inputMemo);
        break;
      }
      default: {
      }
    }
    setOpen({ ...isOpen, [target]: !isOpen[target] });
    closeMoreMenu();
  };

  // Controls open-close Dialogs

  const toggleDialog = (value) => () => {
    if (isOpen[value]) closeMoreMenu();
    setOpen({ ...isOpen, [value]: !isOpen[value] });
  };

  // Functions for Tag

  const handleDeleteChip = (target) => () => {
    // Remove a tag from array and update state
    const tempArray = tempTag.filter((singleTag) => singleTag !== target);
    setTempTag(tempArray);
  };

  const handleAddChip = (event) => {
    const tagString = event.target.value;
    // push to array if string has a space at the end
    if (tagString.endsWith(" ")) {
      setTempTag([...tempTag, tagString.trim()]);
      setInputTag("");
    } else {
      setInputTag(tagString);
    }
  };

  // Functions for Memo

  const handleChangeMemo = (event) => {
    setInputMemo(event.target.value);
  };

  



  
  // Functions for General
  
 

  
  
  return (
    <Card id={postId} className={classes.root}>
      
      <PostHeader postId={post.id} createdDate={statusDates[0].date} />

      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMoreMenu}
      >
        <MenuItem onClick={toggleDialog("tag")}>
          <ListItemIcon>
            <LabelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Tag" />
        </MenuItem>
        <MenuItem onClick={toggleDialog("memo")}>
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Memo" />
        </MenuItem>
        <MenuItem onClick={toggleDialog("delete")}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete Post" />
        </MenuItem>
      </Menu>

      <Dialog
        fullWidth
        open={isOpen.tag}
        onClose={toggleDialog("tag")}
        aria-labelledby="tag-dialog-title"
        aria-describedby="tag-dialog-description"
      >
        <DialogTitle id="tag-dialog-title">{"Add / Remove a Tag."}</DialogTitle>
        <DialogContent>
          <Paper elevation={0} component="ul" className={classes.chiproot}>
            {tempTag.map((tag) => (
              <li key={tag}>
                <Chip
                  className={classes.chip}
                  label={tag}
                  color="primary"
                  onDelete={handleDeleteChip(tag)}
                />
              </li>
            ))}
          </Paper>

          <TextField
            id="add-tag"
            label="Add new tag"
            variant="outlined"
            value={inputTag}
            fullWidth
            onChange={handleAddChip}
          />
        </DialogContent>
        <ConfirmButton
          message="Save"
          name="save"
          clickHandler={handleUpdate("tag")}
          cancelHandler={toggleDialog("tag")}
        />
      </Dialog>

      <Dialog
        id="edit-memo-dialog"
        open={isOpen.memo}
        onClose={toggleDialog("memo")}
        aria-labelledby="memo-dialog-title"
        aria-describedby="memo-dialog-description"
        fullWidth
      >
        <DialogTitle id="memo-dialog-title">{"Edit Memo"}</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            id="edit-memo"
            label=""
            variant="outlined"
            value={inputMemo}
            fullWidth
            onChange={handleChangeMemo}
          />
        </DialogContent>
        <ConfirmButton
          message="Save"
          name="memo"
          clickHandler={handleUpdate("memo")}
          cancelHandler={toggleDialog("memo")}
        />
      </Dialog>

      <Dialog
        id="delete-post-dialog"
        open={isOpen.delete}
        onClose={toggleDialog("delete")}
        aria-labelledby="deleete-dialog-title"
        aria-describedby="delete-dialog-description"
        fullWidth
      >
        <DialogTitle id="delete-dialog-title">{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>

        <ConfirmButton
          message="Delete"
          name="delete"
          clickHandler={handleUpdate("delete")}
          cancelHandler={toggleDialog("delete")}
        />
      </Dialog>

 
     
    </Card>
  );
};

export default Post;
