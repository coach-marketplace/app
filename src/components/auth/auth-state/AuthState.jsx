import React from "react";
import { connect } from "react-redux";

const AuthState = props => {
  console.log("pros", props);
  return <div className="auth-state">user</div>;
};

const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps)(AuthState);
