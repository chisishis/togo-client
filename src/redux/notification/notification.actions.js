import userNotificationTypes from "./notification.types";

const createNotifiactionStart = ({postUserName, postId, receipentsId, mesesage}) => ({
  action: userNotificationTypes.CREATE_NOTIFICATION_START,
  payload: {postUserName, postId, receipentsId, mesesage},
});

const createNotifiactionSuccess = () => ({
  action: userNotificationTypes.CREATE_NOTIFICATION_SUCCESS,
});

const createNotifiactionFailure = (error) => ({
  action: userNotificationTypes.CREATE_NOTIFICATION_FAILURE,
  payload: error,
});

const fetchNotifiactionStart = (userId, ) => ({
    action: userNotificationTypes.FETCH_NOTIFICATION_START,
    payload: { userName, postId, status, message },
  });
  
  const fetchNotifiactionSuccess = () => ({
    action: userNotificationTypes.FETCH_NOTIFICATION_SUCCESS,
  });
  
  const fetchNotifiactionFailure = (error) => ({
    action: userNotificationTypes.FETCH_NOTIFICATION_FAILURE,
    payload: error,
  });

  const removeNotifiactionStart = ({ userName, postId, status, message }) => ({
    action: userNotificationTypes.REMOVE_NOTIFICATION_START,
    payload: { userName, postId, status, message },
  });
  
  const removeNotifiactionSuccess = () => ({
    action: userNotificationTypes.REMOVE_NOTIFICATION_SUCCESS,
  });
  
  const removeNotifiactionFailure = (error) => ({
    action: userNotificationTypes.REMOVE_NOTIFICATION_FAILURE,
    payload: error,
  });
  
export {
    createNotifiactionStart,
    createNotifiactionSuccess,
    createNotifiactionFailure,
    fetchNotifiactionStart,
    fetchNotifiactionSuccess,
    fetchNotifiactionFailure,
    removeNotifiactionStart,
    removeNotifiactionSuccess,
    removeNotifiactionFailure
}