import React, {useState} from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LabelIcon from '@material-ui/icons/Label';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { shortenUrl } from '../../util/utils'

import Tag from "./Tag";
import Status from "./Status";

import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: "100%",
    borderRadius: 8,
  },
  media: {
    height: 240,
  },
  status: {
    flexGrow: 1,
  },
  tags: {
    flexGrow: 1,
  },
  title: {
    textTransform: "capitalize",
  },
  name: {
    margin: "0px 5px 5px 2px",
  },
  cardAction: {
    backgroundColor: "#f8f8f8",
  },
  url: {
    color: '#aaa'
  },

  avatar: {},
}));

const Post = ({ post }) => {
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

  const convertDate = (date) => {
    return dayjs(date).format("MMM DD, YYYY ");
  };

  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null)

  const handleDeleteMenu = () => {
    setOpen(!isOpen)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Card id={postId} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {String(userName).toUpperCase()[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" name='delete-post' onClick={handleClick}>
            <MoreVertIcon/>
          </IconButton>
        }
        title={userName}
        subheader={dayjs(dates.createdAt).format("MMM DD, YYYY")}
      />

      <Menu
        id='post-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LabelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Tag" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Schedule" />
          </MenuItem>
          <MenuItem onClick={handleDeleteMenu}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete Post" />
          </MenuItem>
          
        

        </Menu>
            <Dialog
        open={isOpen}
        onClose={handleDeleteMenu}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteMenu} color="primary">
            Yes
          </Button>
          <Button onClick={handleDeleteMenu} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      
      <CardContent>
        <Typography>{memo}</Typography>
        <Typography align="right">
          <Status status={status} date={convertDate(dates[status + "At"])} />
        </Typography>
      
      </CardContent>
      <CardActionArea className={classes.cardAction}>
        {imageUrl !== "" ? (
          <CardMedia
            className={classes.media}
            component="img"
            alt="spot image"
            image={imageUrl}
            title={title}
          />
        ) : (
          <div></div>
        )}
        <CardContent>

        <Typography
            className={classes.url}
            gutterBottom
            variant="body2"
            component="p"
          >
            {String(shortenUrl(linkUrl)).toUpperCase()}
          </Typography>

          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
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
