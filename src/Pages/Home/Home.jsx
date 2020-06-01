import React, { useEffect, } from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";

import ViewPost from "../../components/Post/ViewPost";
import { fetchPostsStart } from "../../redux/posts/posts.actions";

//import Post from "./Post/Post";

// const initialOrder = {
//   order : 'date's
// }
const useStyles = makeStyles((theme) => ({
  homeComponent: {
    marginTop: 100,
    marginBottom: 100,
  },
}));

const Home = ({ fetchPosts, userData, posts, isLoading }) => {
  /*
  Condition
  1. Fetch post: user sign in / out, new post, delete post
  2. Fetch user list: sign in
  3. Fetch notification: sign in
  
 */

  // fetch data from database with filter and

  const classes = useStyles();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container
      className={classes.homeComponent}
      maxWidth="sm"
      disableGutters={true}
    >
      {!isLoading ? (
        posts.map((post) => <ViewPost key={post.id} postContent={post} />)
      ) : (
        <p>loading</p>
      )}
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPostsStart()),
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  posts: state.posts.posts,
  isLoading: state.posts.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
