import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/home-page/HomePage";
import LoginPage from "../pages/auth-page/LoginPage";
import RegisterPage from "../pages/auth-page/RegisterPage";
import CustomersPage from "../pages/customers-page/CustomersPage";
import NewCustomerPage from "../pages/customers-page/NewCustomerPage";
import ServicePage from "../pages/service-page/ServicePage";
import NewServicePage from "../pages/service-page/NewServicePage";
import SchedulePage from "../pages/schedule-page/SchedulePage";
// import ProfilePage from "../pages/profile-page/ProfilePage";
import AccountPage from "../pages/user-page/AccountPage";
// import ChangePasswordPage from "../components/account/security-section/SecuritySection";
// import BodyPage from "../pages/profile-page/BodyPage";
import LibraryPage from "../pages/library-page/LibraryPage";
import ConversationsPage from "../pages/conversations-page/ConversationsPage";
import ConversationPage from "../pages/conversations-page/ConversationPage";
import AccountValidationPage from "../pages/auth-page/AccountValidationPage";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/account-validation/:userId-:token" exact component={AccountValidationPage}/>

          {/* <Route path="/password" exact component={ChangePasswordPage} /> */}

          <ProtectedRoute path="/" exact component={HomePage} />
          <ProtectedRoute
            path="/customers"
            exact
            component={CustomersPage}
            onlyCoach
          />
          <ProtectedRoute
            path="/customers/new"
            exact
            onlyCoach
            component={NewCustomerPage}
          />
          <ProtectedRoute
            path="/services"
            exact
            component={ServicePage}
            onlyCoach
          />
          <ProtectedRoute
            path="/services/new"
            exact
            onlyCoach
            component={NewServicePage}
          />
          <ProtectedRoute path="/schedule" exact component={SchedulePage} />
          {/* <ProtectedRoute path="/profile" exact component={ProfilePage} /> */}
          <ProtectedRoute
            path="/account/:section"
            exact
            component={AccountPage}
          />
          <ProtectedRoute
            path="/library/:type"
            exact
            component={LibraryPage}
            onlyCoach
          />
          <ProtectedRoute path="/inbox" exact component={ConversationsPage} />
          <ProtectedRoute
            path="/conversation/:id"
            exact
            component={ConversationPage}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
