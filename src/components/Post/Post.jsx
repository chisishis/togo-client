import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";


import CardContent from "@material-ui/core/CardContent";


import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import ConfirmButton from "../elements/ConfirmButton";
import PostActionArea from "./PostActionArea"


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

import { convertDate } from "../../util/utils";

import { usePost } from "../../contexts/post.provider";

import { useAuth } from "../../contexts/user.provider";

import Tag from "./Tag";
import Status from "./Status";

import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: "100%",
    borderRadius: 8,
  },
  
  status: {
    flexGrow: 1,
  },
  tags: {
    flexGrow: 1,
  },

  memo: {
    overflowWrap: "break-word",
  },
  name: {
    margin: "0px 5px 5px 2px",
  },
 

  avatar: {},
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
  const {
    postId,
    title,
    description,
    userName,
    linkUrl,
    imageUrl,
    status,
    tag,
    memo,
    dates,
  } = post;

  const classes = useStyles();
  const userToken = useAuth().user.token;
  const { deletePost, updateTag, updateMemo } = usePost();

  // state and functions for more menu
  const [moreMenuEl, setMoreMenuEl] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [tempMemo, setTempMemo] = useState(memo);

  const handleMoreMenu = (event) => {
    setMoreMenuEl(event.currentTarget);
  };

  const closeMoreMenu = () => {
    setMoreMenuEl(null);
  };

  const [tempTag, setTempTag] = useState(tag);

  // state and function for

  const [isOpen, setOpen] = useState({
    tag: false,
    status: false,
    delete: false,
    memo: false,
  });

  const handleTagMenu = (event) => {
    const targetEl = event.currentTarget.name;
    setOpen({ ...isOpen, tag: !isOpen.tag });
    closeMoreMenu();

    if (targetEl === "save") {
      updateTag(postId, userToken, tempTag);
    }
  };

  const handleDelete = (event) => {
    const targetEl = event.currentTarget.name;
    setOpen({ ...isOpen, delete: !isOpen.delete });
    closeMoreMenu();

    if (targetEl === "delete") {
      deletePost(postId, userToken);
    }
  };

  const handleMemoMenu = (event) => {
    const targetEl = event.currentTarget.name;
    setOpen({ ...isOpen, memo: !isOpen.memo });
    closeMoreMenu();

    if (targetEl === "memo") {
      updateMemo(postId, userToken, tempMemo);
    }
  };

  const handleMemoChange = (event) => {
    setTempMemo(event.target.value);
  };
  const handleChipDelete = (target) => () => {
    const tempArray = tempTag.filter((singleTag) => singleTag !== target);
    setTempTag(tempArray);
  };

  const handleChipAdd = (e) => {
    const tagString = e.target.value;
    // set a tag first

    // push to array if string has a space at the end
    if (tagString.endsWith(" ")) {
      const tagTrimmed = tagString.trim();

      setTempTag([...tempTag, tagTrimmed]);
      setNewTag("");
    } else {
      setNewTag(tagString);
    }
  };

  const CardAvatar = (
    <Avatar aria-label="recipe" className={classes.avatar}>
      {String(userName).toUpperCase()[0]}
    </Avatar>
  );

  const CardActionButton = (
    <IconButton
      aria-label="settings"
      name="delete-post"
      onClick={handleMoreMenu}
    >
      <MoreVertIcon />
    </IconButton>
  );

  const MoreMenu = (props) => <Menu {...props} />;
  MoreMenu.muiName = "Menu";

  const moreMenuItems = [
    {
      handler: handleTagMenu,
      text: 'Edit Tag',
    },
    {
      handler: handleMemoMenu,
      text: 'Edit Memo',
    },
    {
      handler: handleDelete,
      text: 'Delet Post',
    }
  ]

  return (
    <Card id={postId} className={classes.root}>
      <CardHeader
        avatar={CardAvatar}
        action={CardActionButton}
        title={userName}
        subheader={dayjs(dates.createdAt).format("MMM DD, YYYY")}
      />

      <Menu
        id="post-menu"
        anchorEl={moreMenuEl}
        keepMounted
        open={Boolean(moreMenuEl)}
        onClose={closeMoreMenu}
      >
        
        <MenuItem onClick={handleTagMenu}>
          <ListItemIcon>
            <LabelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Tag" />
        </MenuItem>
        <MenuItem onClick={handleMemoMenu}>
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Memo" />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete Post" />
        </MenuItem>
      </Menu>
      <Dialog
        id="delete-post-dialog"
        open={isOpen.delete}
        onClose={handleDelete}
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
          clickHandler={handleDelete}
        />
      </Dialog>

      <Dialog
        id="edit-memo-dialog"
        open={isOpen.memo}
        onClose={handleMemoMenu}
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
            value={tempMemo}
            fullWidth
            onChange={handleMemoChange}
          />
        </DialogContent>
        <ConfirmButton
          message="Save"
          name="memo"
          clickHandler={handleMemoMenu}
        />
      </Dialog>

      <Dialog
        fullWidth
        id="update-tag-dialog"
        open={isOpen.tag}
        onClose={handleTagMenu}
        aria-labelledby="tag-dialog-title"
        aria-describedby="tag-dialog-description"
      >
        <DialogTitle id="tag-dialog-title">
          {"Add or remove a tag."}
        </DialogTitle>
        <DialogContent>
          <Paper elevation={0} component="ul" className={classes.chiproot}>
            {tempTag.map((singleTab) => (
              <li key={singleTab}>
                <Chip
                  className={classes.chip}
                  label={singleTab}
                  color="primary"
                  onDelete={handleChipDelete(singleTab)}
                />
              </li>
            ))}
          </Paper>

          <TextField
            id="add-tag"
            label="Add new tag"
            variant="outlined"
            value={newTag}
            fullWidth
            onChange={handleChipAdd}
          />
        </DialogContent>
        <ConfirmButton
          message="Save"
          name="save"
          clickHandler={handleTagMenu}
        />
      </Dialog>

      <CardContent>
        <Typography variant="body2" component="p" className={classes.memo}>
          {memo}
        </Typography>
        <Typography align="right">
          <Status status={status} date={convertDate(dates[status + "At"])} />
        </Typography>
      </CardContent>



      <PostActionArea image={imageUrl} link={linkUrl} description={description} title={title} />
    
      
      <CardContent>
        <Typography
          xs={12}
          align="right"
          variant="body2"
          color="textSecondary"
          className={classes.tags}
        >
          {tag.map((element) => (
            <Tag key={element} tagItem={element} />
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
