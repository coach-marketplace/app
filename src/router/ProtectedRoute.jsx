import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps)(ProtectedRoute);
