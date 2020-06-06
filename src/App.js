import React, { useEffect, useCallback } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Home from "./Pages/Home/Home";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { checkUserSession } from "./redux/user/user.actions";
import { fetchUsersStart } from "./redux/users/users.actions";

import Loading from "./components/common/Loading";
import SignInSignUp from "./Pages/SignInSignUp/SignInSignUp";


function App() {


  const dispatch = useDispatch();
  const fetchUsers = () => dispatch(fetchUsersStart());
  const checkUser = useCallback( () => dispatch(checkUserSession()), [dispatch])

  const userData = useSelector( state => state.user.userData, shallowEqual);
  const userLoading = useSelector(state => state.user.loading)

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  Boolean(userData) && fetchUsers();

  return (
    <React.Fragment>
      <Router>
        {Boolean(userData) && <Navbar />}
        <Switch>
        
          {/* <Route exact path='/logout' component={SignOut} />
        <Route exact path='/post/:id' component={Post} />         */}
          <Route
            exact
            path="/"
            render={() =>
              Boolean(userData) ? <Home/> : <SignInSignUp />
            }
          />
        </Switch>
        {userLoading && <Loading />}
      </Router>
    </React.Fragment>
  );
}


export default App;
