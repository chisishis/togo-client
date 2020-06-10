import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";

import PostAction from "./PostAction";
import PostAvatar from "./PostAvatar";
import { useUsers } from "../../contexts/UsersProvider";
import { convertDate } from "../../util";

const PostHeader = ({
  authorId,
  postId,
  createdDate,
  tags,
  memo
}) => {

  const users = useUsers();
  const curentUserId = useSelector(
    (state) => state.user.userData.userId,
    shallowEqual
  );
    
  const postOwnerName = users.getDisplayName(authorId)
  
  return (
    <CardHeader
      avatar={<PostAvatar name={postOwnerName[0]} />}
      action={
        curentUserId === authorId && <PostAction postId={postId} tags={tags} memo={memo} />
      }
      title={postOwnerName}
      subheader={convertDate(createdDate.date)}
    />
  );
};

PostHeader.propTypes = {
  authorId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  createdDate: PropTypes.object.isRequired,
  tags : PropTypes.array,
  memo: PropTypes.string
};

export default PostHeader;
