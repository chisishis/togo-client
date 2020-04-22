import React, { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import Post from '../components/Post/Post'



const initialPost = {
  data: null,
};

// set initial state for sort order
// date
// userName
const initialOrder = {
  order : 'date'
}

// set initial state for filter
// All
// Created
// Planned
// Completed
// Postponed
// 

const initialFilter = {
  all: true,
  created: false,
  planned: false,
  completed: false,
  postponed: false,
  cancelled: false

}

const dataFetch  = async (orderBy, filterBy) => {    
  try {
    const fetchData = await Axios("https://us-central1-togo-b7cd6.cloudfunctions.net/app/posts");
    return fetchData.data;
  }
  catch (err) {
    console.error(err);
  }
}

const Home = () => {

  
  const [posts, setPosts] = useState(initialPost);
  const [order, setOrder] = useState(initialOrder);
  const [filter, setFilter] = useState(initialFilter);

  // Fetch the database on mounting
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
