import React from "react";
import "./App.css";

import customTheme from "./assets/theme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home";



import { PostProvider } from "./contexts/post.provider";
import { UserProvider } from "./contexts/user.provider";

function App() {
  const theme = createMuiTheme(customTheme);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <PostProvider>
          <Navbar />
          {/* <Home /> */}
        </PostProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
