import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./AppContext";
import Routes from "./Routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
