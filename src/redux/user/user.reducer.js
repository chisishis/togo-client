import userActionTypes from "./user.types";

// const INITIAL_STATE = {
//   userData: {
//     userId: null,
//     userName: null,
//     email: null,
//   },
//   loading: false,
//   error: {},
// };

const INITIAL_STATE = {
  userData: null,
  loading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_START:
    case userActionTypes.SIGN_OUT_START:
    case userActionTypes.SIGN_UP_START:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.SIGN_IN_SUCCESS:
    case userActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null
      };

    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        userData: null,
        loading: false,
        error: null
      };
   
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case userActionTypes.CHECK_USER_SESSION:
      return {};

    default:
      return state;
  }
};

export default userReducer;
