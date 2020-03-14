import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

import validationSchema from "./validation";
import Form from "../../../components/ui/form/Form";
import Field from "../../../components/ui/form/field/Field";
import Button from "../../../components/ui/button/Button";

class LoginForm extends Component {
  static displayName = "LoginForm";

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={this.props.onSubmit}
      >
        <Form>
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="john@doe.com"
          />
          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="********"
          />
          <Button type="submit">Login</Button>
        </Form>
      </Formik>
    );
  }
}

export default LoginForm;
