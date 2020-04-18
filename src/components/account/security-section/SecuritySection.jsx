import React, { Component } from "react";
import { connect } from "react-redux";

import ChangePasswordForm from "../../profile/ChangePasswordForm";

class SecuritySection extends Component {
  render() {
    return (
      <div>
        <ChangePasswordForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps)(SecuritySection);
