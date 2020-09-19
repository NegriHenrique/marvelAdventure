import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./AppContext";
import Routes from "./Routes";

import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
