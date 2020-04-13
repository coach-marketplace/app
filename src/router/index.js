import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./ProtectedRoute";

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
import InboxPage from "../pages/inbox-page/InboxPage";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />

          <ProtectedRoute path="/" exact component={HomePage} />
          <ProtectedRoute path="/customers" exact component={CustomersPage} />
          <ProtectedRoute
            path="/customers/new"
            exact
            component={NewCustomerPage}
          />
          <ProtectedRoute path="/services" exact component={ServicePage} />
          <ProtectedRoute
            path="/services/new"
            exact
            component={NewServicePage}
          />
          <ProtectedRoute path="/schedule" exact component={SchedulePage} />
          <ProtectedRoute path="/profile" exact component={ProfilePage} />
          <ProtectedRoute path="/library/:type" exact component={LibraryPage} />
          <ProtectedRoute path="/inbox" exact component={InboxPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps)(Router);
