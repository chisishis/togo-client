import React, {useEffect} from "react";
import "./App.css";

import customTheme from "./assets/theme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import Navbar from "./components/NavBar/Navbar";
//import Home from "./pages/Home";
import { connect } from "react-redux";
import { checkUserSession } from './redux/user/user.actions'


function App( {checkUserSession, currentUser} ) {
  const theme = createMuiTheme(customTheme);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])
   
  
  

  return (
    <ThemeProvider theme={theme}>
      

          <Navbar />
          {/* <Home /> */}

   
    </ThemeProvider>
  );
}

const mapStateToProps = (state, ownProps) => ({
 currentUser : state.user.userData
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
