import React, { createContext, useState, useContext } from "react";

import Axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const post = usePostProvider();
  return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  return useContext(PostContext);
};

const convertFilterToString = (filterObject) => {
  const filterMap = {
    all: "a",
    created: "c",
    planned: "p",
    cancelled: "x",
    postponed: "n",
    completed: "o",
  };

  let filteredString = "";

  for (let [key, value] of Object.entries(filterObject)) {
    if (value) filteredString += filterMap[key];
  }
  console.log(filteredString);
  return filteredString;
};

const usePostProvider = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState("false");
  const [isUpdated, setUpdated] = useState("true");
  //const [filter, setFilter] =

  const baseUrl = "https://us-central1-togo-b7cd6.cloudfunctions.net/app";

  const getPosts = (filterObject) => {
    setLoading(true);
    Axios.get(`${baseUrl}/posts/${convertFilterToString(filterObject)}`)
      .then((result) => {
        setPosts(result.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const postNew = (userData, token) => {
    const header = { headers: { Authorization: `Bearer ${token}` } };
    console.log(header, userData);
    Axios.post(
      "https://us-central1-togo-b7cd6.cloudfunctions.net/app/post",
      userData,
      header
    )
      .then((res) => {
        getPosts({ all: true });
        console.log(res.data);
      })
      .catch((e) => {
        //setErrors(e.response.data);
        console.log(e.response.data);
      });
  };

  return {
    getPosts,
    posts,
    isLoading,
    isUpdated,
    postNew
  };
};
