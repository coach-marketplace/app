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
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { onRegister, onSubmit } = this.props;

    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
          <div>
            <Button type="submit">Login</Button>
            {onRegister && (
              <Button
                label="No account yet? Register"
                appearance="minimal"
                onClick={onRegister}
              />
            )}
          </div>
        </Form>
      </Formik>
    );
  }
}

export default LoginForm;
