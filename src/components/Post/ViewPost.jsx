import React from "react";
import { makeStyles } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Tags from "./Tags";
import PostLink from "./PostLink";
import PostStatus from "./PostStatus";
import ShareWith from "./ShareWith";
import PostHeader from "./PostHeader";

import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: "100%",
    borderRadius: 8,
  },
}));

const ViewPost = ({ postContent }) => {
  const classes = useStyles();

  const {
    id,
    authorId,
    statusDates,
    memo,
    link,
    tags,
    shareWith,
  } = postContent;


  return (
    <Card key={id} className={classes.root}>
      <PostHeader
        authorId={authorId}
        postId={id}
        createdDate={statusDates[0]}
      />
      <CardContent>
        {/* <PostStatus status={statusDates.splice(-1)} /> */}
        <ShareWith sharedUserArray={shareWith} id={id} />
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          children={memo}
        />
      </CardContent>

      <PostLink link={link} />

      <CardContent>
        <Tags tags={tags} />
      </CardContent>
    </Card>
  );
};

ViewPost.propTypes = {
  postContent: PropTypes.object }

export default ViewPost;
