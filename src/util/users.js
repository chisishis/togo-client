import { useSelector, shallowEqual } from "react-redux";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import GroupIcon from "@material-ui/icons/Group";

/**
 * A hook retruns user name from user list array
 *
 * @param {string} id
 */
export const useUserName = (id) => {
  const userList = useSelector((state) => state.users.userList, shallowEqual);
  const user = userList.find((user) => user.userId === id);
  return user.displayName;
};

// const useUsersNameArray = ( array ) => {
//   const userList = useSelector( state => state.users.userList, shallowEqual);
//   const userArray =
// }

export const getNameFromId = (list, id) => {
  const user = list.find((user) => user.userId === id);  
  return user.displayName;
};

export const useUserShortenedArray = (array) => {
  const userList = useSelector((state) => state.users.userList, shallowEqual);

  switch (array[0]) {
    case "999999":
      return [PublicIcon, "Everyone"];
    case "000000":
      return [LockIcon, "OnlyMe"];
    default: {
      const length = array.length;
      const firstPerson = getNameFromId(userList, array[0]);
      if (length === 1) {
        return [GroupIcon, firstPerson];
      } else {
        return [GroupIcon, `${firstPerson} and ${array.length - 1} more..  `];
      }
    }
  }
};
