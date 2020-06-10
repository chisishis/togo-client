import React, { useEffect, } from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";

import ViewPost from "../../components/Post/ViewPost";
import { fetchPostsStart } from "../../redux/posts/posts.actions";

import { UsersProvider } from '../../contexts/UsersProvider'

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

const Home = ({ fetchPosts, postCollection, isLoading }) => {
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
    <UsersProvider>
    <Container
      className={classes.homeComponent}
      maxWidth="sm"
      disableGutters={true}
    >
      {!isLoading ? (
        postCollection.map((post) => <ViewPost key={post.id} post={post} />)
      ) : (
        <p>loading</p>
      )}
    </Container>
    </UsersProvider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPostsStart()),
});

const mapStateToProps = (state) => ({  
  postCollection: state.posts.postCollection,
  isLoading: state.posts.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
