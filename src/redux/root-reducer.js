import { combineReducers } from 'redux';

import filterReducer from './filter/filter.reducer';
import usersReducer from './users/users.reducer'
import userReducer from './user/user.reducer';
import postsRecuder from './posts/posts.reducer';

const rootReducer = combineReducers ({
    filters: filterReducer,
    users: usersReducer,
    user: userReducer,
    posts: postsRecuder
 

})

export default rootReducer;