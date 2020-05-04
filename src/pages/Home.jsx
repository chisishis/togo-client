import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";


import Post from "../components/Post/Post";


import { usePost } from "../contexts/post.provider";

// const initialOrder = {
//   order : 'date's
// }


const Home = () => {
  
  const { action, filter, fetchPosts, posts } = usePost();  
  
  const [isLoading, setLoading] = useState(true);
  
  


  //Fetch the database on mounting only
  useEffect(() => {
    fetchPosts(filter);
    setLoading(false)    
  },[action]);

  console.log('home render')
  return (       
        <Container className="component" maxWidth="sm" disableGutters={true}>        
      
            {!isLoading ? (
            posts.map((post) => <Post  key={post.postId} post={post} />)
          ) : (
            <p>loading</p>
          )}      
          
        </Container>   
  );
};

export default Home;
