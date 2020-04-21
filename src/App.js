import React, {useState} from "react";
import "./App.css";

import customTheme from "./assets/theme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";



import { UserProvider}  from './contexts/user.provider'



// const tempUserInitialState = {
//   userName: 'chris',
//   email: 'chisishis@gmail.com',
//   token: ''
// }

function App() {

  
  const theme = createMuiTheme(customTheme);


    

   

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Navbar/>        
               {/* <Home />  */}
        
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
