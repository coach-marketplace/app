import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Formik } from "formik";

// import validationSchema from "./validation";
import Form from "../../ui/form/Form";
import Field from "../../ui/form/field/Field";
import Button from "../../ui/button/Button";
import * as actions from "../../../store/modules/auth/actions";

class RegisterForm extends Component {
  state = {
    isRegistrationLoading: false,
    email: "",
    password: ""
  };
  // TODO: login when register is complete

  onSubmit = data => {
    this.setState(
      {
        isRegistrationLoading: true,
        email: data.email,
        password: data.password
      },
      () => {
        this.props.register(data);
      }
    );
  };

  // TODO: validation form
  render() {
    const { isRegistrationLoading, email, password } = this.state;

    return (
      <Formik
        initialValues={{
          email: email,
          password: password
        }}
        // validationSchema={validationSchema}
        onSubmit={this.onSubmit}
      >
        <Form>
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="john@doe.com"
            disabled={isRegistrationLoading}
          />

          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            disabled={isRegistrationLoading}
          />

          <Button type="submit" isLoading={isRegistrationLoading}>
            Register
          </Button>
        </Form>
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  isRegisterLoading: state.auth.actions.register.loading,
  isRegisterError: state.auth.actions.register.error,
  isRegisterSuccess: state.auth.actions.register.success,
  authUser: state.auth.authUser
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(actions.register(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
