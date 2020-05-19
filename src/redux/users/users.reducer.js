import usersActionTypes from "./users.types";

const INITIAL_STATE = {
  userList: [],
  isLoading: false,
  error: null,
};

const usersRecuder = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case usersActionTypes.FETCH_USERS_START:
      return {
        ...state,
        isLoading: true,
      };
    case usersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        isLoading: false,
      };
    case usersActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default usersRecuder;
