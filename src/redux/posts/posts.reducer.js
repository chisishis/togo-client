import postActionTypes from "./posts.types";
import { reorderedPosts, fetchPosts } from "../../util/firebase.utils";

// stores posts
const INITIAL_STATE = {
  posts: null,
  isFetching: false,
  message: {
    seccess: undefined,
    error: undefined,
  },
  filter: ["all"],
  order: "new",
};

const postsRecuder = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postActionTypes.NEW_POST_START:
    case postActionTypes.EDIT_MEMO_START:
    case postActionTypes.EDIT_TAG_START:
    case postActionTypes.EDIT_SHARE_START:
    case postActionTypes.EDIT_STATUS_START: // post at firebase
      return {
        ...state,
        isFetching: true,
      };

    case postActionTypes.DELETE_POST_START:
        return {
            ...state,            
            
        }

    case postActionTypes.NEW_POST_SUCCESS:
    case postActionTypes.DELETE_POST_SUCCESS:
    case postActionTypes.EDIT_MEMO_SUCCESS:
    case postActionTypes.EDIT_TAG_SUCCESS:
    case postActionTypes.EDIT_SHARE_SUCCESS:
    case postActionTypes.EDIT_STATUS_SUCCESS: // post at firebase
      // fetch posts using filter and order
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
        message: { success: `${action.type} Succesfully Done` },
      };

    case postActionTypes.NEW_POST_FAILURE:
    case postActionTypes.DELETE_POST_FAILURE:
    case postActionTypes.EDIT_MEMO_FAILURE:
    case postActionTypes.EDIT_TAG_FAILURE:
    case postActionTypes.EDIT_SHARE_FAILURE:
    case postActionTypes.EDIT_STATUS_FAILURE:
    case postActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        massage: { error: action.payload },
        isFetching: false,
      };

    case postActionTypes.UPDATE_FILTER:
      return {
        ...state,
        posts: reorderedPosts(action.payload, state.order),
        filter: action.payload,
      };

    case postActionTypes.UPDATE_SORT_ORDER:
      return {
        ...state,
        posts: reorderedPosts(state.filter, action.payload),
        order: action.payload,
      };

    case postActionTypes.FETCH_POSTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case postActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default postsRecuder;
