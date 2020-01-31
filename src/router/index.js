import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "../pages/home-page/HomePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
