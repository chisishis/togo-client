import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core";

import Post from "../components/Post/Post";

import { usePost } from "../contexts/post.provider";

// const initialOrder = {
//   order : 'date's
// }
const useStyles = makeStyles((theme) => ({
  homeComponent: {
    marginTop: 100,
    marginBottom: 100
  }
})
);

const Home = () => {
  
  const { action, fetchPosts, posts, filterPosts, isLoading } = usePost();
  

  const classes = useStyles();

 

  //Fetch the database on mounting only
  // action triggers  when API is called or filter is changed
  useEffect(() => {
    // if action is one of those (new, memo, include, )
    if (
      action.includes('new') ||
      action.includes('delete') ||
      action.includes('memo') ||
      action.includes('tag') ||
      action.includes('status') ||
      action.includes('start')      
      ) {
      fetchPosts();      
    } else {
      console.log('fetch')
      filterPosts();
    }    
    
  }, [action]);

  
  return (
    <Container className={classes.homeComponent} maxWidth="sm" disableGutters={true}>
      {!isLoading ? (
        posts.map((post) => <Post key={post.postId} post={post} />)
      ) : (
        <p>loading</p>
      )}
    </Container>
  );
};

export default Home;
