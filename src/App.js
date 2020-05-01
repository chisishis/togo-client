import React from "react";
import "./App.css";

import customTheme from "./assets/theme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home";

import { UserProvider } from "./contexts/user.provider";
import { FilterProvider } from "./contexts/filter.provider";
import { PostProvider } from "./contexts/post.provider";

function App() {
  const theme = createMuiTheme(customTheme);

  return (
    <FilterProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
        <PostProvider> 
          <Navbar />              
          <Home />            
          </PostProvider>
        </ThemeProvider>
      </UserProvider>
    </FilterProvider>
  );
}

export default App;
