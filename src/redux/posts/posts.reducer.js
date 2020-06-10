import postsActionTypes from "./posts.types";

// stores posts
const INITIAL_STATE = {
  postCollection: null,
  isLoading: true,
  error: false,
  isUpdating: false,
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
        postCollection: action.payload,
        isLoading: false,
      };
    case postsActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case postsActionTypes.UPDATE_POST_START:
      return {
        ...state,
        isUpdating: true,
      };

    case postsActionTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        postCollection: state.postCollection.map((post) => {
          const { id, objectKey, objectValue } = action.payload;

          if (post.id === id) {
            return { ...post, [objectKey]: objectValue };
          } else {
            return post;
          }
        }),
      };
    case postsActionTypes.UPDATE_POST_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.payload,
      };

    case postsActionTypes.DELETE_POST_START:
      return {
        ...state,
        isUPdating: true,
      };

    case postsActionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        postCollection: state.postCollection.filter((post) => post.id !== action.payload && post)
      };

    case postsActionTypes.DELETE_POST_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postsRecuder;
