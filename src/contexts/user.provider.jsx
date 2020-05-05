/*

Context provider for user auth.

1. UserProvider : Context provider to wrap app.js
2. useAuth : Custom hook to provide user data using API
  - user (email, username, token)
  - login (email, password) : fetches database and retrive userName, email and token
  - logout : set userStates to null
  - errors : stores error from API calls 

*/

import React, { createContext, useState, useContext, useEffect } from "react";

import jwtDecode from "jwt-decode";
import axios from "axios";

const UserContext = createContext();

// Context Profive to wrap app.js
export const UserProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

// Custom hook for child components to get auth
export const useAuth = () => {
  return useContext(UserContext);
};

// Custoom hook object to store auth data
const useAuthProvider = () => {
  // User State
  const [user, setUser] = useState({
    userName: "",
    email: "",
    token: "",
    userId: "",
    isValid: false,
    loading: false,
  });



  //Error State
  const [errors, setErrors] = useState({
    general: "",
    password: "",
    email: "",
  });

  const login = (email, password) => {
    const userInput = {
      email: email,
      password: password,
    };

    axios
      .post(
        "https://us-central1-togo-b7cd6.cloudfunctions.net/app/login",
        userInput
      )
      .then((res) => {
        const newUser = {
          userName: res.data.userName,
          email: res.data.email,
          token: res.data.token,
          userId: res.data.userId,
          isValid: true,
          loading: false,
        };
        localStorage.setItem('userName',newUser.userName);
        localStorage.setItem('email',newUser.email);
        localStorage.setItem('token', newUser.token);
        localStorage.setItem('userId', newUser.userId)
        
        setUser(newUser);
      })
      .catch((e) => {
        setUser({ isValid: false });
        setErrors(e.data);
      });
  };

  const logout = () => {
    //emtry state
    setUser({
      userName: "",
      email: "",
      token: "",
      isValid: false,
      loading: true,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setErrors({});
  };

  const isTokenValid = (token = user.token) => {
    // check if the user has a token
    if (token) {
      // check if the uer token is not expired
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setUser({ isValid: true });
        return true;
      } else {
        console.log("token is invalid");
        setUser({ isvalid: false });
        return false;
      }
    } else {
      setUser({ isValid: false });
      return false;
    }
  };

  useEffect(()=>{
    if (isTokenValid(localStorage.getItem('token'))) {
      setUser( {
        userName: localStorage.getItem('userName'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        isValid: true,
        loading: false
      })
    }
    
  },[])

  return {
    user,
    errors,
    login,
    logout,
    isTokenValid,
  };
};
