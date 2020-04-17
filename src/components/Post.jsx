import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Tag from "../components/Tag";
import Status from "../components/Status";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: "100%",
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
      textTransform: 'capitalize'
  }
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
    dates,
  } = post;
  const classes = useStyles();

  dayjs.extend(customParseFormat);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="spot image"
          image={imageUrl}
          title={title}
        />

        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="body2" align="right">
            {dayjs(dates.createdAt).format("MMM DD, YYYY")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography xs={12} className={classes.status}>
            <Status status={status} date={dayjs(dates[status+'At']).format("MMM DD, YYYY")} />
        </Typography>
      </CardActions>{" "}
      <CardActions>
        <Typography
          xs={12}
          align="right"
          variant="body2"
          color="textSecondary"
          className={classes.tags}
        >
          TAG:
          {tag.map((element) => (
            <Tag key={element} tagItem={element} />
          ))}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Post;
