import React, { useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Home from "./Pages/Home/Home";

import { connect } from "react-redux";
import { checkUserSession } from "./redux/user/user.actions";
import Loading from "./components/common/Loading";
import SignInSignUp from "./Pages/SignInSignUp/SignInSignUp";

import { fetchUsersStart } from "./redux/users/users.actions";

function App({ checkUserSession, userLoading, userData, fetchUsers }) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

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
            path="/signin"
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

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchUsers: () => dispatch(fetchUsersStart()),
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  userLoading: state.user.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
