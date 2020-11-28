import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, onlyCoach, ...rest }) => {
  const renderComponent = (props, user) => {
    if (onlyCoach && !user.isCoach) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  const renderToLogin = (props) => {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    );
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        rest.user ? renderComponent(props, rest.user) : renderToLogin(props)
      }
    />
  );
};

ProtectedRoute.defaultProps = {
  onlyCoach: false,
};

const mapStateToProps = (state) => ({
  user: state.user.current,
});

export default connect(mapStateToProps)(ProtectedRoute);
