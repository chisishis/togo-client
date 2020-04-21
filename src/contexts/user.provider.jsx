/*

Context provider for user auth.

1. UserProvider : Context provider to wrap app.js
2. useAuth : Custom hook to provide user data using API
  - user (email, username, token)
  - login (email, password) : fetches database and retrive userName, email and token
  - logout : set userStates to null
  - errors : stores error from API calls 

*/

import React, { createContext, useState, useEffect, useContext } from "react";

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
  const [user, setUser] = useState({
    userName: "",
    email: "",
    token: "",
    isValid: true,
  });

  const [errors, setErrors] = useState({});
  axios.defaults.baseURL =
    "https://us-central1-togo-b7cd6.cloudfunctions.net/app";

  const login = (email, password) => {
    const userInput = {
      email: email,
      password: password,
    };
    
    axios
      .post("/login", userInput)
      .then((res) => {

        const newUser = {
            userName: res.data.userName,
            email: res.data.email,
            toke: res.data.token,
            isValid: true
        }
        
        setUser(newUser);
        
      })
      .catch((err) => {
        setErrors({ errors: err.response.data });
        setUser({ isValid: false });
      });
  };

  const logout = () => {
    //emtry state
    setUser({
      userName: "",
      email: "",
      token: "",
      isValid: false,
    });
  };

  useEffect(() => {
    if (user.token) {
      const decoded = jwtDecode(user.token);
      if (decoded.exp * 1000 < Date.now()) {
        setUser({ isvalid: false });
      } else {
        setUser({ isValid: true });
      }
    } else {
      setUser({ isValid: false });
    }
  }, [user.token]);

  return {
    user,
    errors,
    login,
    logout,
  };
};
