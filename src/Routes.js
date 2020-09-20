import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout";
import Catalogo from "./pages/Catalogo";
import Detalhes from "./pages/Detalhes";

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/catalogo" component={Catalogo} />
          <Route exact path="/detalhes">
            <Redirect to="/catalogo" />
          </Route>
          <Route exact path="/detalhes/:id" component={Detalhes} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
