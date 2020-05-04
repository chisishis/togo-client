import React from "react";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { shortenUrl } from "../../util/utils";

import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core";

const PostActionArea = ({ image, title, link, description }) => {
  const classes = makeStyles({
    media: {
      height: 240,
    },
    url: {
      color: "#aaa",
    },
    title: {
      textTransform: "capitalize",
    },
    cardAction: {
      backgroundColor: "#f8f8f8",
    },
  });

  return (
    <CardActionArea className={classes.cardAction}>
      {image !== "" && (
        <CardMedia
          className={classes.media}
          component="img"
          alt="spot image"
          image={image}
          title={title}
        />
      )}
      <CardContent>
        <Typography
          className={classes.url}
          gutterBottom
          variant="body2"
          component="p"
        >
          {String(shortenUrl(link)).toUpperCase()}
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
  );
};

PostActionArea.protoType = {
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PostActionArea;
