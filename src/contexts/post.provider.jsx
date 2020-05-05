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
  const [tag, setTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [action, setAction] = useState('start');
  const [isLoading, setLoading] = useState('true')
  const [filter, setFilter] = useState({
    all: true,
    created: true,
    planned: true,
    postponed: true,
    cancelled: true,
    completed: true,
  });

  const baseUrl = "https://us-central1-togo-b7cd6.cloudfunctions.net/app";

  const compositeHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
  });

  const deletePost = (id, token) => {
    Axios.delete(`${baseUrl}/post/${id}`, compositeHeader(token))
      .then((res) => {
        setAction(`delete : ${id}`);
      })
      .catch((e) => {        
        console.log(e.response.data);
      });
  };

  const fetchPosts = () => {
    setLoading(true);
    Axios.get(`${baseUrl}/posts`)
      .then((result) => {
        setFilteredPosts(result.data);
        return result.data;     
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
        
      })
      .catch((error) => {
        return error;
      });

    
  };

  const filterPosts = () => {
    // convert filter to array
    const filterArray = [];
    for (let [key, value] of Object.entries(filter)) {
      value && filterArray.push(key);
    }
    const newPost = filteredPosts.filter( post => {
      if (filterArray.includes(post.status)) {
        if (!tag || post.tag.includes(tag)) {
          return post;
        }
        return null;
      }
      return null;
    })
    console.log(newPost)
    setPosts(newPost);
  }

  const updateTag = (id, token, tempTag) => {
    const bodyData = {
      key: "tag",
      data: tempTag,
    };
    Axios.post(`${baseUrl}/post/${id}`, bodyData, compositeHeader(token))
      .then((res) => {
        // getPosts({ all: true });        
        setAction(`tag: ${tempTag.join(' ')}`);
      })
      .catch((e) => {
        //setErrors(e.response.data);
        console.log(e.response.data);
      });
  };

  const postNew = (userData, token) => {
    Axios.post(`${baseUrl}/post`, userData, compositeHeader(token))
      .then((res) => {
        // getPosts({ all: true });        
        setAction(`new ${userData.title}`);
      })
      .catch((e) => {
        //setErrors(e.response.data);
        console.log(e.response.data);
      });
  };

  const updateFilter = (filterObject) => {
    setFilter(filterObject);
    setAction(`Filter Changed to ${convertFilterToString(filter)}`);
  };

  const updateMemo = (id, token, data) => {
    const bodyData = {
      key: "memo",
      data: data,
    };
    Axios.post(`${baseUrl}/post/${id}`, bodyData, compositeHeader(token))
      .then((res) => {
        // getPosts({ all: true });

       
        setAction(res.data.message);
      })
      .catch((e) => {
        //setErrors(e.response.data);
        console.log(e.response.data);
      });
  };

  const updateDates = (id, token, date) => {
    const bodyData = {
      key: "dates",
      data: { key: date.key, date: date.date },
    };
    Axios.post(`${baseUrl}/post/${id}`, bodyData, compositeHeader(token))
      .then((res) => {
        // getPosts({ all: true });

        console.log(res.data.message);
        setAction(res.data.message);
      })
      .catch((e) => {
        //setErrors(e.response.data);
        console.log(e.response.data);
      });
  };

  const searchTag = (tag) => {
    console.log(tag);
    setTag (tag);
    setAction (`filter ${tag}`);
  }

  return {
    tag,
    fetchPosts,
    posts,
    postNew,
    deletePost,
    filter,
    updateFilter,
    action,
    updateTag,
    updateDates,
    updateMemo,
    filterPosts,
    searchTag,
    isLoading,
    setLoading,
  };
};
