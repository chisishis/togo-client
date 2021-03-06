import userActionTypes from "./user.types";

const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user
});

const checkUserSession = (token) => ({
  type: userActionTypes.CHECK_USER_SESSION,
 
});

const signInStart = (userCredential) => ({
  type: userActionTypes.SIGN_IN_START,
  payload: userCredential,
});

const signInSuccess = (userData) => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: userData,
});

const signInFailure = (error) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,

});

const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

const signOutFailure = (error) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

const signUpStart = (userCredential) => ({
  type: userActionTypes.SIGN_UP_START,
  payload: userCredential
})

const signUpSuccess = (userData) => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: userData
})

const signUpFailure = error => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error
})


export {
  setCurrentUser,
  checkUserSession,
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure

};
