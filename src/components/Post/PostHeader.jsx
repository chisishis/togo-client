import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";

import PostAction from "./PostAction";
import PostAvatar from "./PostAvatar";
import { useUsers } from "../../contexts/UsersProvider";

const PostHeader = ({
  authorId,
  postId,
  createdDate
}) => {

  const users = useUsers();
  const curentUserId = useSelector(
    (state) => state.user.userData.id,
    shallowEqual
  );
    
  const postOwnerName = users.getDisplayName(authorId)
  
  return (
    <CardHeader
      avatar={<PostAvatar name={postOwnerName[0]} />}
      action={
        curentUserId === authorId && <PostAction postIndex={postId} />
      }
      title={postOwnerName}
      subheader={createdDate.date}
    />
  );
};

PostHeader.propTypes = {
  authorId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  createdDate: PropTypes.object.isRequired
};

export default PostHeader;
