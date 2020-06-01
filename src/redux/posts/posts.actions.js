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



export {
  
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,

};
