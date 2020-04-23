import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import Post from "../components/Post/Post";

import { useFilter } from "../contexts/user.filter.provider";

// const initialOrder = {
//   order : 'date'
// }

const Home = () => {
  const { filter } = useFilter();
  const [posts, setPosts] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const fetchDataFromDb = () => {
    let filterQuery = "";

    for (let [key, value] of Object.entries(filter)) {
      if (value) {
        switch (key) {
          case "all":
            filterQuery = "a";
            break;
          case "created":
            filterQuery += "c";
            break;
          case "planned":
            filterQuery += "p";
            break;
          case "completed":
            filterQuery += "o";
            break;
          case "postponed":
            filterQuery += "n";
            break;
          case "cancelled":
            filterQuery += "x";
            break;
          default:
        }
      }
    }

    console.log(filter);
    Axios.get(
      `https://us-central1-togo-b7cd6.cloudfunctions.net/app/posts/${filterQuery}`
    )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Fetch the database on mounting only
  useEffect(() => {
    fetchDataFromDb();
  }, [filter]);

  return (
    <div className="component">
      <Container maxWidth="sm" disableGutters={true}>
        <div>
          {posts ? (
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
