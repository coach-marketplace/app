import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "../pages/home-page/HomePage";
import LoginPage from "../pages/auth-page/LoginPage";
import RegisterPage from "../pages/auth-page/RegisterPage";
import CustomersPage from "../pages/customers-page/CustomersPage";
import NewCustomerPage from "../pages/customers-page/NewCustomerPage";
import ServicePage from "../pages/service-page/ServicePage";
import NewServicePage from "../pages/service-page/NewServicePage";
import SchedulePage from "../pages/schedule-page/SchedulePage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import LibraryPage from "../pages/library-page/LibraryPage";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/customers" exact component={CustomersPage} />
          <Route path="/customers/new" exact component={NewCustomerPage} />
          <Route path="/services" exact component={ServicePage} />
          <Route path="/services/new" exact component={NewServicePage} />
          <Route path="/schedule" exact component={SchedulePage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/library/:type" exact component={LibraryPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps)(Router);
