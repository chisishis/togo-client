import {createContext} from 'react';

const user = {
    userName: 'chris',
    email: 'chisisis@gmail.com'
}

const UserContext = createContext(user);

export default UserContext;