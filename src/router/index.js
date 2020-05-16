import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/home-page/HomePage";
import LoginPage from "../pages/auth-page/LoginPage";
import RegisterPage from "../pages/auth-page/RegisterPage";
import CustomersPage from "../pages/customers-page/CustomersPage";
// import NewCustomerPage from "../pages/customers-page/NewCustomerPage";
import ServicePage from "../pages/service-page/ServicePage";
// import NewServicePage from "../pages/service-page/NewServicePage";
// import SchedulePage from "../pages/schedule-page/SchedulePage";
// import ProfilePage from "../pages/profile-page/ProfilePage";
import AccountPage from "../pages/user-page/AccountPage";
// import ChangePasswordPage from "../components/account/security-section/SecuritySection";
// import BodyPage from "../pages/profile-page/BodyPage";
import LibraryPage from "../pages/library-page/LibraryPage";
import ConversationsPage from "../pages/conversations-page/ConversationsPage";
import ConversationPage from "../pages/conversations-page/ConversationPage";
import EditProgramPage from "../pages/library-page/EditProgramPage";

// TODO: Clean up routes, add new service into a modal to remove the page

const routes = [
  {
    path: "/login",
    isExact: true,
    isProtected: false,
    isOnlyCoach: false,
    component: LoginPage,
  },
  {
    path: "/register",
    isExact: true,
    isProtected: false,
    isOnlyCoach: false,
    component: RegisterPage,
  },
  {
    path: "/",
    isExact: true,
    isProtected: true,
    isOnlyCoach: false,
    component: HomePage,
  },
  {
    path: "/customers",
    isExact: true,
    isProtected: true,
    isOnlyCoach: true,
    component: CustomersPage,
  },
  {
    path: "/services",
    isExact: true,
    isProtected: true,
    isOnlyCoach: true,
    component: ServicePage,
  },
  {
    path: "/account/:section",
    isExact: true,
    isProtected: true,
    isOnlyCoach: false,
    component: AccountPage,
  },
  {
    path: "/library/:type",
    isExact: true,
    isProtected: true,
    isOnlyCoach: true,
    component: LibraryPage,
  },
  {
    path: "/inbox",
    isExact: true,
    isProtected: true,
    isOnlyCoach: false,
    component: ConversationsPage,
  },
  {
    path: "/conversation/:id",
    isExact: true,
    isProtected: true,
    isOnlyCoach: false,
    component: ConversationPage,
  },
  {
    path: "/coach/programs/:id/edit",
    isExact: true,
    isProtected: true,
    isOnlyCoach: true,
    component: EditProgramPage,
  },
];

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map((route) => {
            const RouteComponent = route.isProtected ? ProtectedRoute : Route;

            return (
              <RouteComponent
                key={route.path}
                path={route.path}
                exact={route.isExact}
                onlyCoach={route.isOnlyCoach}
                component={route.component}
              />
            );
          })}
          {/* 
          <ProtectedRoute
            path="/customers/new"
            exact
            onlyCoach
            component={NewCustomerPage}
          /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
