import React, { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import Axios from "axios";


import Post from '../components/Post'

import dotenv from 'dotenv'

const initialState = {
  data: null,
};





const Home = () => {

 

  dotenv.config();
  const [posts, setPosts] = useState(initialState);


  useEffect(() => {
    Axios.get("https://us-central1-togo-b7cd6.cloudfunctions.net/app/posts")
      .then((res) => {
        setPosts({ data: res.data });
      })
      .catch((err) => console.error(err));
  }, []);



  return (
    <div className="component">
      <Container maxWidth="sm" disableGutters={true}>
        <div>


          {posts.data ? (
            posts.data.map((post) => <Post key={post.postId} post={post}/>)
          ) : (
            <p>loading</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
