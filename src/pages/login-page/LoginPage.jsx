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
    console.log("stat", this.state);
    this.props.onAuth(this.state.email, this.state.password);
  };
  onLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    console.log("inside loginpahe", this.props);
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
  console.log("HH", state);
  return {
    a: state.auth.authUser,
    isLoading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  console.log("dispatchdispatch", dispatch);
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    logout: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
