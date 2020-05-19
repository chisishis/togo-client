import userActionTypes from "./user.types";

const INITIAL_STATE = {
  userData: {
    userId: null,
    userName: null,
    email: null,
    token: null,
  },
  isValid: false,
  loading: false,
  error: {}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_START:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isValid: true,
        loading: false,
        error: null,
        userData: action.payload,
      };

    case userActionTypes.SIGN_IN_FAILURE:
        return {
            error: action.payload,
            isvalid: false,
            loading: false
        }  
    
    case userActionTypes.CHECK_USER_SESSION:
        return {

        }
    
    default:
      return {...state}
  }
};

export default userReducer;