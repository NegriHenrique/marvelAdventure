import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./AppContext";
import Routes from "./Routes";

import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
//privatekey 67ddf7ce071603af019e0af9b32084cf30a23a90

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
