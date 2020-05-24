import postActionTypes from "./post.types";

export const newPostStart = (post) => ({
  type: postActionTypes.NEW_POST_START,
  payload: post,
});

export const newPostSuccess = () => ({
  type: postActionTypes.NEW_POST_SUCCESS,
});

export const newPostFailure = (error) => ({
  type: postActionTypes.NEW_POST_START,
  payload: error,
});


// Fetch OG Data
export const fetchOgStart = (url) => ({
  type: postActionTypes.FETCH_OG_START,
  payload: url,
});

export const fetchOgSuccess = (fetchedData) => ({
  type: postActionTypes.FETCH_OG_SUCCESS,
  payload: fetchedData,
});

export const fetchOgFailure = (error) => ({
  type: postActionTypes.FETCH_OG_FAILURE,
  error: error,
});

export const deleteOg = () => ({
  type: postActionTypes.fetch,
});

// Delete Post
export const deletePostStart = (postId) => ({
  type: postActionTypes.DELETE_POST_START,
  payload: postId,
});

export const deletePostSuccess = () => ({
  type: postActionTypes.DELETE_POST_SUCCESS,
});

export const deletePostFailure = (error) => ({
  type: postActionTypes.DELETE_POST_FAILURE,
  payload: error,
});


// Update Memo
export const updateMemoStart = (post) => ({
  type: postActionTypes.UPDATE_MEMO_START,
  payload: post
});

export const updateMemoSuccess = () => ({
  type: postActionTypes.UPDATE_MEMO_SUCCESS,
});

export const updateMemoFailure = (error) => ({
  type: postActionTypes.UPDATE_MEMO_FAILURE,
  payload: error,
});


// update Tag
export const updateTagStart = (post) => ({
  type: postActionTypes.UPDATE_TAG_START,
  payload: post,
});

export const updateTagSuccess = () => ({
  type: postActionTypes.UPDATE_TAG_SUCCESS,
});

export const updateTagFailure = (error) => ({
  type: postActionTypes.UPDATE_TAG_FAILURE,
  payload: error,
});


// Update Share and Notification
export const updateShareStart = (post) => ({
  type: postActionTypes.UPDATE_SHARE_START,
  payload: post,
});

export const updateShareSuccess = () => ({
  type: postActionTypes.UPDATE_SHARE_SUCCESS,
});

export const updateShareFailure = (error) => ({
  type: postActionTypes.UPDATE_SHARE_FAILURE,
  payload: error,
});


// Update Share and Notification
export const updateStatusStart = (post) => ({
  type: postActionTypes.UPDATE_STATUS_START,
  payload: post,
});

export const updateStatusSuccess = () => ({
  type: postActionTypes.UPDATE_STATUS_SUCCESS,
});

export const updateStatusFailure = (error) => ({
  type: postActionTypes.UPDATE_STATUS_FAILURE,
  payload: error,
});
