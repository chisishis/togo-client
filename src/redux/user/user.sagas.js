import { takeLatest, put, all, call } from "redux-saga/effects";

import userActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signUpFailure,
  signUpSuccess,
  signOutSuccess,
  signOutFailure,

} from "./user.actions";



import { auth, firestore, getCurrentUser } from "../../util/firebase";


export function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    //displayProgressCircle("Signing In")
    const { user } = yield auth.signInWithEmailAndPassword(email, password);

    const userData = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
    };

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

    yield firestore.collection("users").doc(user.uid).set({
      id: user.uid,
      displayName : user.displayName,
      email: user.email,      
      createdAt: user.metadata.creationTime,
    });

    yield put(signUpSuccess({ email, displayName, id: user.uid }));
    yield put()
  } catch (error) {
    yield put(signUpFailure(error.code));
  }
}

export function* signOutStart() {
  try {
    yield auth.signOut();

    yield put(signOutSuccess());    
  } catch (error) {
    yield put(signOutFailure(error.code));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield put(
      signInSuccess({
        email: userAuth.email,
        displayName: userAuth.displayName,
        userId: userAuth.uid,
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInWithEmailPassword() {
  yield takeLatest(userActionTypes.SIGN_IN_START, signInWithEmailAndPassword);
}

export function* onSignUpWithEmailAndPassword() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUpWithEmailAndPassword);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOutStart);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onSignInWithEmailPassword),
    call(onSignUpWithEmailAndPassword),
    call(onSignOutStart),
    call(onCheckUserSession),
 
  ]);
}
