import { combineReducers } from 'redux';

import filterReducer from './filter/filter.reducer';
import usersReducer from './users/users.reducer'
import userReducer from './user/user.reducer';

const rootReducer = combineReducers ({
    filters: filterReducer,
    users: usersReducer,
    user: userReducer
})

export default rootReducer;