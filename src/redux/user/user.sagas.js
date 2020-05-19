import axios from "axios";

import { takeLatest, put, all, call } from 'redux-saga/effects';

import userActionTypes from './user.types';

import { signInSuccess, signInFailure, checkUserSession } from './user.actions'

export function* processSignIn(response) {
    try {
        const loggedInUser = {
            userId: response.data.userId,
            userName: response.data.userName,
            email: response.data.email,
            token: response.data.token
        }

        localStorage.setItem('userName',loggedInUser.userName);
        localStorage.setItem('email',loggedInUser.email);
        localStorage.setItem('token', loggedInUser.token);
        localStorage.setItem('userId', loggedInUser.userId)
        
        yield put(signInSuccess(loggedInUser));
    } catch (error) {
        yield put(signInFailure(error))
    }
}


export function* signInWithEmailAndPassword({payload: {email, password}}) {
    
    const userData = {email,password};
    
    try {
        const response = yield  axios.post("https://us-central1-togo-b7cd6.cloudfunctions.net/app/login",userData);
        yield processSignIn(response);
     

    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onSignInWithEmailPassword() {
    yield takeLatest(userActionTypes.SIGN_IN_START, signInWithEmailAndPassword)
}

export function* userSagas() {
    yield all([
        call(onSignInWithEmailPassword)
    ])
}