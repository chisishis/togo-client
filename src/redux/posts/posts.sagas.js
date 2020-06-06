import { takeLatest, call, put, all } from "redux-saga/effects";
import postsActionTypes from "./posts.types";
import { fetchPostsSuccess, fetchPostsFailure, updatePostSuccess, updatePostFailure } from "./posts.actions";
import { firestore } from "../../util/firebase";

export function* fetchPosts() {
  try {
    const collectionRef = firestore.collection("posts");
    const querySnapshot = yield collectionRef.get();
    const posts = querySnapshot.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));

    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsFailure(error));
  }
}

export function* updatePost({payload: {updatedPostCollection, index}}) {
  try {

    console.log (updatedPostCollection, index);
    const collectionRef = firestore.collection("posts");
    const documentRef = yield collectionRef.doc(updatedPostCollection[index].id);

    yield documentRef.update(updatedPostCollection[index])  


    yield put(updatePostSuccess(updatedPostCollection));
  } catch (error) {
    yield put(updatePostFailure(error))
  }

}


export function* onFetchPost() {
  yield takeLatest(postsActionTypes.FETCH_POSTS_START, fetchPosts);
}

export function* onUpdatePost() {
  yield takeLatest(postsActionTypes.UPDATE_POST_START, updatePost);
}

export function* postsSagas() {
  yield all([
    call(onFetchPost),
    call(onUpdatePost)])
}
