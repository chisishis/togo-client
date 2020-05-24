import postActionTypes from "./post.types";

const INITIAL_STATE = {
  post: {
    //postId: null,
    created: null,
    memo: null,
    currentStatus: null
  },

  sharedWith: [],
  tags: [],
  statusDates: {
      created: null,
      planned: null,
      postponed: null,
      cancelled: null,
      completed: null,
 },
 link: {
      url: null,
      imageUrl: null,
      title: null,
      description: null,
 },


  loading: false,
  error: null,
};

const postRecuder = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postActionTypes.NEW_POST_START:
      return {
        ...state,
        post: action.payload.post,
        shareWith: action.payload.shareWith,
        tags: action.payload.tags,
        statusDates: action.payload.statusDates,
        link: action.payload.link,
        error: null,
        loading: true,
      };

    case postActionTypes.NEW_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case postActionTypes.NEW_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

      case  postActionTypes.FETCH_OG_START:
      return {
          ...state,
          loading: true,          
      }

      case postActionTypes.FETCH_OG_SUCCESS:
          return {
              ...state,
              loading: false,
              link: action.payload
          }

      

    default:
      return state;
  }
};
