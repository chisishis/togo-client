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

const updatePostStart = (updatedCollectionWithIndex) => ({
  type: postsActionTypes.UPDATE_POST_START,
  payload: updatedCollectionWithIndex
})

const updatePostSuccess = (updatedPostCollection) => ({
  type: postsActionTypes.UPDATE_POST_SUCCESS,
  payload: updatedPostCollection
})

const updatePostFailure = (error) => ({
  type: postsActionTypes.UPDATE_POST_FAILURE,
  payload: error
})

export {
  
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure

};
