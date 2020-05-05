import React from "react";
import PropTypes from "prop-types";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

import { shortenUrl } from "../../util/utils";

const useStyle = makeStyles({
  url: {
    color: "#aaa",
  },
  title: {
    textTransform: "capitalize",
  },
});

const PostActionArea = ({ image, title, link, description }) => {
  const classes = useStyle();
  const openWindow = () => {
    window.open(link, "_blank");
  };

  return (
    <CardActionArea onClick={openWindow}>
      {image !== "" && (
        <CardMedia
          className={classes.media}
          component="img"
          height="240"
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
