import { takeLatest, call, put, all } from "redux-saga/effects";
import postsActionTypes from "./posts.types";
import { fetchPostsSuccess, fetchPostsFailure } from "./posts.actions";
import { firestore } from "../../util/firebase";

export function* fetchPosts() {
  try {
    const collectionRef = firestore.collection("posts");
    const querySnapshot = yield collectionRef.get();
    const posts = querySnapshot.docs.map( doc => ({ id: doc.id , ...doc.data() }));

    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsFailure(error));
  }
}

export function* onFetchPost() {
  yield takeLatest(postsActionTypes.FETCH_POSTS_START, fetchPosts);
}

export function* postsSagas() {
  yield call(onFetchPost);
}
