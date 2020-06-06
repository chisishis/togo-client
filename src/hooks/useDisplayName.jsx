import { useState} from "react";
import { useSelector, shallowEqual } from "react-redux";

/**
 * A hook retruns user name from user list array
 *
 * 
 */
export const useDisplayName = () => {
  const getUserList = useSelector((state) => state.users.userList, shallowEqual);

  const [userList] = useState(getUserList);

  const displayName = (index) => userList.find((user) => user.userId === index);

  return {
    displayName,
  };
};
