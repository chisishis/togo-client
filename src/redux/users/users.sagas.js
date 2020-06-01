import { takeLatest, put, call } from "redux-saga/effects";

import usersActionTypes from "./users.types";

import { fetchUsersSuccess, fetchUsersFailure } from "./users.actions";

import { firestore } from "../../util/firebase";

export function* fecthUsers() {
  try {
    const collectionRef = firestore.collection("users");
    const snapShot = yield collectionRef.get();
    const usersList = snapShot.docs.map((doc) => doc.data())
      
      

    yield put(fetchUsersSuccess(usersList));
  } catch (error) {
    yield put(fetchUsersFailure(error.code));
  }
}

export function* onFetchUsersStart() {
  yield takeLatest(usersActionTypes.FETCH_USERS_START, fecthUsers);
}

export function* usersSagas() {
  yield call(onFetchUsersStart);
}
