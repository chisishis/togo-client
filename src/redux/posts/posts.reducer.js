import postsActionTypes from "./posts.types";

// stores posts
const INITIAL_STATE = {
  posts: null,
  isLoading: true,
  error: false,
};

const postsRecuder = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postsActionTypes.FETCH_POSTS_START:
      return {
        ...state,
        isLoading: true,
      };

    case postsActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case postsActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postsRecuder;
