import usersActionTypes from './users.types'

export const fetchUsersStart = () => ({
    type: usersActionTypes.FETCH_USERS_START,    
})

export const fetchUsersSuccess = (userList) => ({
    type: usersActionTypes.FETCH_USERS_SUCCESS,  
    payload: userList
})

export const fetchUsersFailure = (error) => ({
    type: usersActionTypes.FETCH_USERS_FAILURE,    
    payload: error
})
