import React from "react";
import { connect } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";

import PostActionButton from "./PostActionButton";
import PostAvatar from "./PostAvatar";

const PostHeader = ({
  postId,
  loggedInName,
  createdDate,
  displayName,
  users,
}) => {
  return (
    <CardHeader
      avatar={<PostAvatar displayName={displayName} />}
      action={displayName === loggedInName && <PostActionButton />}
      title={displayName}
      subheader={createdDate}
    />
  );
};

const mapStatesToProps = (state, ownProps) => ({
  users: state.users,
  loggedInName: state.user.userData.displayName,
  displayName: ownProps.displayName,
  createdDate: ownProps.createdDate,
});

export default connect(mapStatesToProps)(PostHeader);
