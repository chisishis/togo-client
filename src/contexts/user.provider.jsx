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

  // User State
  const [user, setUser] = useState({
    userName: "",
    email: "",
    token: "",
    isValid: false,
    loading: true
  });

  //Error State
  const [errors, setErrors] = useState({
    general:'',
    password: '',
    email: ''
  })

  
 
  const post = (userData) => {
    const header = {headers: {Authorization : `Bearer ${user.token}`}};
    console.log(header)
    axios
      .post("https://us-central1-togo-b7cd6.cloudfunctions.net/app/post", userData, header)
      .then( res => {
        console.log(res.data);
      })
      .catch((e) => {     
        setErrors (e.response.data)     
        console.log(e.response.data);
      });
  }
    

  const login = (email, password) => {
    const userInput = {
      email: email,
      password: password,
    };
   
    axios
      .post("https://us-central1-togo-b7cd6.cloudfunctions.net/app/login", userInput)
      .then((res) => {
        const newUser = {
          userName: res.data.userName,
          email: res.data.email,
          token: res.data.token,
          isValid: true,
          loading: false,
        };
        setUser(newUser);
        
      })
      .catch((e) => {     
        setUser({isValid: false});
        setErrors (e.response.data)     
      });
  };

  const logout = () => {
    //emtry state
    setUser({
      userName: "",
      email: "",
      token: "",
      isValid: false,
      loading: true
    });
    setErrors({});
  };

  useEffect(() => {
    if (user.token) {
      const decoded = jwtDecode(user.token);
      if (decoded.exp * 1000 < Date.now()) {
        console.log("token is invalid")
        setUser({ isvalid: false });
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
    post,
  };
};
