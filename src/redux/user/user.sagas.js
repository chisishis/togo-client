import { takeLatest, put, all, call } from "redux-saga/effects";

import userActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signUpFailure,
  signUpSuccess,
  checkUserSession,
} from "./user.actions";

import { auth, firestore } from "../../util/firebase";

export function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);

    const userData = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    localStorage.setItem("displayName", userData.displayName);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("userId", userData.userId);

    yield put(signInSuccess(userData));
  } catch (error) {
    yield put(signInFailure(error.code));
  }
}

export function* signUpWithEmailAndPassword({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield user.updateProfile({ displayName });

    localStorage.setItem("displayName", displayName);
    localStorage.setItem("email", user.email);
    localStorage.setItem("userId", user.uid);

    yield put(signUpSuccess({ email, displayName, userId: user.uid }));
  } catch (error) {
    yield put(signUpFailure(error.code));
  }
}

export function* onSignInWithEmailPassword() {
  yield takeLatest(userActionTypes.SIGN_IN_START, signInWithEmailAndPassword);
}

export function* onSignUpWithEmailAndPassword() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUpWithEmailAndPassword);
}

export function* userSagas() {
  yield all([
    call(onSignInWithEmailPassword),
    call(onSignUpWithEmailAndPassword),
  ]);
}
