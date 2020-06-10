import React from 'react'
import PropTypes from 'prop-types'
import ConfirmDialog from '../common/ConfirmDialog'
import { useDispatch } from "react-redux";
import { deletePostStart } from "../../redux/posts/posts.actions"

const DeletePost = ({open, closeHandler, postId}) => {

    const dispatch = useDispatch();

    const deletePost = async () => {
        closeHandler();
        dispatch(deletePostStart(postId))
    }

    return (
        <ConfirmDialog  open={open}
        dialogTitle={'Delete Post'}
        dialogMessage = {'Are you sure you want to delete this post?'}
        confirmHandler = {deletePost}
        confirmMessage = {'Delete'}
        cancelHandler = {closeHandler}
        dividers= {false}
        />
    )
}

DeletePost.propTypes = {
    open: PropTypes.bool.isRequired,
    closeHandler: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
}

export default DeletePost
