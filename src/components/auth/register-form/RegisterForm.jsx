import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

// import validationSchema from "./validation";
import Form from "../../ui/form/Form";
import Field from "../../ui/form/field/Field";
import Button from "../../ui/button/Button";

class RegisterForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onLogin: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
  };

  // TODO: validation form
  render() {
    const { onLogin, isLoading, onSubmit } = this.props;

    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="john@doe.com"
            disabled={isLoading}
          />

          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            disabled={isLoading}
          />

          <div>
            <Button label="Register" type="submit" isLoading={isLoading} />
            {onLogin && (
              <Button
                label="Already an account? Log in"
                appearance="minimal"
                onClick={onLogin}
              />
            )}
          </div>
        </Form>
      </Formik>
    );
  }
}

export default RegisterForm;
