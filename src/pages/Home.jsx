import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";

import Post from "../components/Post/Post";

import { useFilter } from "../contexts/filter.provider";
import { usePost } from "../contexts/post.provider";




// const initialOrder = {
//   order : 'date'
// }

const Home = () => {
  const { filter } = useFilter();
  const { getPosts,posts,isLoading } = usePost();  

  //Fetch the database on mounting only
  useEffect(() => {
    getPosts(filter);    
  },[filter]);

  return (  
      <div className="component">
        <Container maxWidth="sm" disableGutters={true}>
          <div>
            {!isLoading ? (
            posts.map((post) => <Post key={post.postId} post={post} />)
          ) : (
            <p>loading</p>
          )}
          </div>
        </Container>
      </div>
   
  );
};

export default Home;
