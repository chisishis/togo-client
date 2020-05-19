import userNotificationTypes from "./notification.types";

const createNotifiactionStart = ({ userName, postId, status, message }) => ({
  action: userNotificationTypes.CREATE_NOTIFICATION_START,
  payload: { userName, postId, status, message },
});

const createNotifiactionSuccess = () => ({
  action: userNotificationTypes.CREATE_NOTIFICATION_SUCCESS,
});

const createNotifiactionFailure = (error) => ({
  action: userNotificationTypes.CREATE_NOTIFICATION_FAILURE,
  payload: error,
});

const fetchNotifiactionStart = ({ userName, postId, status, message }) => ({
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
    action: userNotificationTypes.FETCH_NOTIFICATION_START,
    payload: { userName, postId, status, message },
  });
  
  const removeNotifiactionSuccess = () => ({
    action: userNotificationTypes.FETCH_NOTIFICATION_SUCCESS,
  });
  
  const removeNotifiactionFailure = (error) => ({
    action: userNotificationTypes.FETCH_NOTIFICATION_FAILURE,
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