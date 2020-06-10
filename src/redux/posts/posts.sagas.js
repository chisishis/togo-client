import { takeLatest, call, put, all } from "redux-saga/effects";
import postsActionTypes from "./posts.types";
import {
  fetchPostsSuccess,
  fetchPostsFailure,
  updatePostSuccess,
  updatePostFailure,
  deletePostSuccess,
  deletePostFailure,
} from "./posts.actions";
import { firestore } from "../../util/firebase";

export function* fetchPosts() {
  try {
    const collectionRef = firestore.collection("posts");
    const querySnapshot = yield collectionRef.get();
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsFailure(error));
  }
}

export function* updatePost({ payload: updatedObjectWithIndex }) {
  try {
    const { id, objectKey, objectValue } = updatedObjectWithIndex;
    const collectionRef = firestore.collection("posts");
    const documentRef = yield collectionRef.doc(id);

    yield documentRef.update({ [objectKey]: objectValue });
    yield put(updatePostSuccess(updatedObjectWithIndex));

  } catch (error) {
    yield put(updatePostFailure(error));
  }
}

export function* deletePost({payload: postId}) {
  
  try {
    yield  put(deletePostSuccess(postId))
  } catch (error) {
    yield put(deletePostFailure(error))
  }
}



export function* onFetchPost() {
  yield takeLatest(postsActionTypes.FETCH_POSTS_START, fetchPosts);
}

export function* onUpdatePost() {

  yield takeLatest(postsActionTypes.UPDATE_POST_START, updatePost);
}

export function* onDeletePost() {
  yield takeLatest(postsActionTypes.DELETE_POST_START, deletePost);
}

export function* postsSagas() {
  yield all([call(onFetchPost), call(onUpdatePost), call(onDeletePost)]);
}
