import notificationTypes from "./notification.types";

const INITIAL_STATE = {
  notificationItem: [],
  error: undefined,
  isFetching: false,
  message: undefined
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case notificationTypes.FETCH_NOTIFICATION_SUCCESS:
    case notificationTypes.REMOVE_NOTIFICATION_SUCCESS:
    case notificationTypes.CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isFetching: true,        
      };

 

    case notificationTypes.FETCH_NOTIFICATION_FAILURE:
    case notificationTypes.REMOVE_NOTIFICATION_FAILURE:
    case notificationTypes.CREATE_NOTIFICATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;
