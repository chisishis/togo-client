import postsActionTypes from "./posts.types";

const fetchPostsStart = () => ({
  type: postsActionTypes.FETCH_POSTS_START,
})

const fetchPostsSuccess = (fetchedPosts) => ({
  type: postsActionTypes.FETCH_POSTS_SUCCESS,
  payload: fetchedPosts
})

const fetchPostsFailure = (error) => ({
  type: postsActionTypes.FETCH_POSTS_FAILURE,
  payload: error
})


// updatedObjectWithIndex  = { id , objectKey. objectValue}
const updatePostStart = (updatedObjectWithIndex) => ({
  type: postsActionTypes.UPDATE_POST_START,
  payload: updatedObjectWithIndex
})

const updatePostSuccess = (updatedObjectWithIndex) => ({
  type: postsActionTypes.UPDATE_POST_SUCCESS,
  payload: updatedObjectWithIndex
})

const updatePostFailure = (error) => ({
  type: postsActionTypes.UPDATE_POST_FAILURE,
  payload: error
})

const deletePostStart = (postId) => ({
  type: postsActionTypes.DELETE_POST_START,
  payload: postId
})

const deletePostSuccess = (postId) => ({
  type: postsActionTypes.DELETE_POST_SUCCESS,
  payload: postId
})

const deletePostFailure = (error) => ({
  type: postsActionTypes.DELETE_POST_FAILURE,
  payload: error
})



export {
  
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure

};
