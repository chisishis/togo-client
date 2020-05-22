import userActionTypes from "./user.types";

const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

const checkUserSession = (token) => ({
  type: userActionTypes.CHECK_USER_SESSION,
  payload: token
});

const signInStart = (emailAndPassword) => ({
  type: userActionTypes.SIGN_IN_START,
  payload: emailAndPassword,
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

const signOutFailuer = (error) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

const signUpStart = (userCredential) => ({
  type: userActionTypes.signUpStart,
  payload: userCredential
})

const signUpSuccess = (userData) => ({
  type: userActionTypes.signUpSuccess,
  payload: userData
})

const signUpFailure = error => ({
  type: userActionTypes.signUpFailure,
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
  signOutFailuer,
  signUpStart,
  signUpSuccess,
  signUpFailure

};
