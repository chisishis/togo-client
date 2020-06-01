import React from "react";
import PropTypes from "prop-types";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { shortenUrl } from "../../util";

const useStyle = makeStyles({
  url: {
    color: "#aaa",
  },
  title: {
    textTransform: "capitalize",
  },
});

const PostLink = ({ link }) => {
  const { description, imageUrl, isValid, title, url } = link;
  const classes = useStyle();
  const openWindow = () => {
    window.open(url, "_blank");
  };

  const shortenedUrl = String(shortenUrl(url)).toUpperCase();

  return (
    <CardActionArea onClick={openWindow}>
      {imageUrl !== "" && (
        <CardMedia
          className={classes.media}
          component="img"
          height="240"
          alt="spot image"
          image={imageUrl}
          title={title}
        />
      )}
      <CardContent>
        <Typography
          className={classes.url}
          gutterBottom
          variant="body2"
          component="p"
          children={shortenedUrl}
        />

        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
          children={title}
        />

        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          children={description}
        />
      </CardContent>
    </CardActionArea>
  );
};

PostLink.protoType = {
  link: PropTypes.object.isRequired,
};

export default PostLink;
