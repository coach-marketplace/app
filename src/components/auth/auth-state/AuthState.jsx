import React from "react";
import { connect } from "react-redux";

const AuthState = props => {
  console.log("pros", props);
  return (
    <div className="auth-state">
      {props.authUser ? props.authUser.first_name : "none"}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authUser: state.auth.authUser
  };
};

export default connect(mapStateToProps)(AuthState);
