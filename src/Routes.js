import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout";
import Catalogo from "./pages/Catalogo";

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/personagens" component={Home} />
          <Route exact path="/catalogo" component={Catalogo} />
          <Route exact path="/catalogo" component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
