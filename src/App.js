import React, {useState} from "react";
import "./App.css";

import customTheme from "./assets/theme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";


import UserContext from './contexts/UserContext';


function App() {


  const theme = createMuiTheme(customTheme);

  const [user, setUser] = useState({
    userName: 'Chris',
    emnail: 'chisishis@gmail.com'
  })

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Home />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
