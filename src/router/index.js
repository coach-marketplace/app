import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "../pages/home-page/HomePage";
import LoginPage from "../pages/login-page/LoginPage";
import CustomersPage from "../pages/customers-page/CustomersPage";
import NewCustomerPage from "../pages/customers-page/NewCustomerPage";
import ServicePage from "../pages/service-page/ServicePage";
import NewServicePage from "../pages/service-page/NewServicePage";
import SchedulePage from "../pages/schedule-page/SchedulePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/customers" exact component={CustomersPage} />
        <Route path="/customers/new" exact component={NewCustomerPage} />
        <Route path="/services" exact component={ServicePage} />
        <Route path="/services/new" exact component={NewServicePage} />
        <Route path="/schedule" exact component={SchedulePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
