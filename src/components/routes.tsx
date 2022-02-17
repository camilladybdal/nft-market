import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CreateColorToken from "../pages/CreateColorToken";
import NFTHome from "../pages/NFTHome";
import CreateTokens from "../pages/CreateTokens";
import Layout from "./Layout";
import MyTokens from "../pages/MyTokens";
import CreatorDashbord from '../pages/CreatorDashbord'

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path={"/"}>
        <Layout>
          <NFTHome />
        </Layout>
      </Route>

      <Route exact path={"/createcolortoken"}>
        <Layout>
          <CreateColorToken />
        </Layout>
      </Route>
    </Switch>

      <Route exact path={"/createtokens"}>
        <Layout>
          <CreateTokens />
        </Layout>
      </Route>

      <Route exact path={"/mytokens"}>
        <Layout>
          <MyTokens />
        </Layout>
      </Route>

      <Route exact path={"/creatordashbord"}>
        <Layout>
          <CreatorDashbord />
        </Layout>
      </Route>


  </Router>
);

export default Routes;
