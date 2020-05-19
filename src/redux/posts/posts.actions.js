import postActionTypes from "./posts.types";


const newPostStart = (post) => ({
  type: postActionTypes.NEW_POST_START,
  payload: post,
});

const newPostSuccess = () => ({
  type: postActionTypes.NEW_POST_SUCCESS,
});

const newPostFailure = (error) => ({
  type: postActionTypes.NEW_POST_FAILURE,
  payload: error,
});

const deletePostStart = (id) => ({
  type: postActionTypes.DELETE_POST_START,
  payload: id,
});

const deletePostSuccess = () => ({
  type: postActionTypes.DELETE_POST_SUCCESS,
});

const deletePostFailure = (error) => ({
  type: postActionTypes.DELETE_POST_FAILURE,
  payload: error,
});

const editMemoStart = ({ postId, memo }) => ({
  type: postActionTypes.EDIT_MEMO_START,
  payload: { postId, memo },
});

const editMemoSuccess = () => ({
  type: postActionTypes.EDIT_MEMO_SUCCESS,
});

const editMemoFailure = (error) => ({
  type: postActionTypes.EDIT_MEMO_FAILURE,
  payload: error,
});

const editTagStart = ({ postId, tag }) => ({
  type: postActionTypes.EDIT_TAG_START,
  payload: { postId, tag },
});

const editTagSuccess = () => ({
  type: postActionTypes.EDIT_TAG_SUCCESS,
});

const editTagFailure = (error) => ({
  type: postActionTypes.EDIT_TAG_FAILURE,
  payload: error,
});

const editShareStart = ({ postId, target }) => ({
  type: postActionTypes.EDIT_SHARE_START,
  payload: { postId, target },
});

const editShareSuccess = () => ({
  type: postActionTypes.EDIT_SHARE_SUCCESS,
});

const editShareFailure = (error) => ({
  type: postActionTypes.EDIT_SHARE_FAILURE,
  payload: error,
});

const editStatusStart = ({ postId, status, date }) => ({
  type: postActionTypes.EDIT_STATUS_START,
  payload: { postId, status, date },
});

const editStatusSuccess = () => ({
  type: postActionTypes.EDIT_STATUS_SUCCESS,
});

const editStatusFailure = (error) => ({
  type: postActionTypes.EDIT_STATUS_FAILURE,
  payload: error,
});

const updateFilter = (filter) => ({
  type: postActionTypes.UPDATE_FILTER,
  payload: filter,
});

const updateSortOrder = (sortOrder) => ({
  type: postActionTypes.UPDATE_SORT_ORDER,
  payload: sortOrder,
});

const fetchPostsStart = () => ({
  type: postActionTypes.FETCH_POSTS_START,  
});

const fetchPostsSuccess = (fetchedPosts) => ({
  type: postActionTypes.FETCH_POSTS_SUCCESS,
  payload: fetchedPosts
});

const fetchPostsFailure = (errorMassage) => ({
  type: postActionTypes.FETCH_POSTS_START,
  payload: errorMassage
});


export {
  newPostStart,
  newPostFailure,
  newPostSuccess,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  editMemoStart,
  editMemoSuccess,
  editMemoFailure,
  editTagStart,
  editTagSuccess,
  editTagFailure,
  editShareStart,
  editShareSuccess,
  editShareFailure,
  editStatusStart,
  editStatusSuccess,
  editStatusFailure,
  updateFilter,
  updateSortOrder,
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,

};
