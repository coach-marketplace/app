import React from "react";
import { connect } from "react-redux";

import Header from "../../components/ui/layout/header/Header";
import * as actions from "../../store/modules/auth/actions";

class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onFieldChange = (fieldName, event) => {
    this.setState({ [fieldName]: event.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };
  onLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div className="page-wrapper">
        <Header />
        <form>
          <input
            type="text"
            placeholder="email"
            onChange={e => this.onFieldChange("email", e)}
            value={this.state.email}
          />
          <input
            type="text"
            placeholder="password"
            onChange={e => this.onFieldChange("password", e)}
            value={this.state.password}
          />
          <button onClick={this.onSubmit}>Submit</button>
          <button onClick={this.onLogout}>logout</button>
        </form>
        {this.props.a}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoginLoading: state.auth.actions.login.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(actions.login(email, password)),
    logout: () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
