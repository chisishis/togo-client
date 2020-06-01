import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import Tags from "./Tags";
import PostLink from "./PostLink";
import PostStatus from "./PostStatus";
import ShareWith from "./ShareWith";
import PostHeader from "./PostHeader";

import { getSharedUserArray, getNameFromId } from "../../util";

import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: "100%",
    borderRadius: 8,
  },
}));

const ViewPost = ({ postContent, userList }) => {
  const { id, post, link, shareWith, statusDates, tags } = postContent;

  const classes = useStyles();

  const createdDate = dayjs(statusDates[0].date).format("MMM DD, YYYY");
  const displayName = getNameFromId(userList, post.userId);
  const sharedUserArray = getSharedUserArray(userList, shareWith);

  return (
    <Card key={id} id={id} className={classes.root}>
      <PostHeader createdDate={createdDate} displayName={displayName} />
      <CardContent>
        <PostStatus status={statusDates.slice(-1)} />
        <ShareWith sharedUserArray={sharedUserArray} />
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          children={post.memo}
        />
      </CardContent>

      <PostLink link={link} />

      <CardContent>
        <Tags tags={tags} />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => ({
  userList: state.users.userList,
  postContent: ownProps.postContent,
});
export default connect(mapStateToProps)(ViewPost);
