
import React, { useState, useContext, createContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useSelector, shallowEqual } from 'react-redux';
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import GroupIcon from "@material-ui/icons/Group";


const usersContext = createContext();


/**
 * A custom hook from User List
 * 
 * @property {array} users 
 * @method {array} userIndexArray
 * @method {array} users
 */
export const useUsers = () => useContext(usersContext)

export const UsersProvider = ({ children }) => {

    const post = useProvideUsers();

    return (
        <usersContext.Provider value={post}>{children}</usersContext.Provider>
    )
}

const useProvideUsers = () => {
    const [users, setUsers] = useState()

    const userList = useSelector( state => state.users.userList, shallowEqual)

    useEffect(() => {
        setUsers(userList)
        return () => {
            setUsers(null)
        }
    }, [userList])

    const usersIndexArray = () => {
        return users.map( user => user.id)
    }

    const getDisplayName = (userId) => {
        return users.find( user => user.id === userId ).displayName;
    }

    const ShortenedArray = (array) => {
             
        switch (array[0]) {
          case "999999":
            return [PublicIcon, "Everyone"];
          case "000000":
            return [LockIcon, "OnlyMe"];
          default: {
            const length = array.length;
            const firstPerson = getDisplayName(array[0]);
            if (length === 1) {
              return [GroupIcon, firstPerson];
            } else {
              return [GroupIcon, `${firstPerson} and ${array.length - 1} more..  `];
            }
          }
        }
      };

    return {
        users,
        usersIndexArray,
        getDisplayName,
        ShortenedArray
    }
}

UsersProvider.propTypes = {
    children : PropTypes.node.isRequired
}


