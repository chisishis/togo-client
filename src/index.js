import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import customTheme from "./assets/theme";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
const theme = createMuiTheme(customTheme);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
