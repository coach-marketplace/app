import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import validationSchema from "./validation";
import { Form, Field, Button } from "../../ui";

const RegisterForm = ({ initialValues, onLogin, isLoading, onSubmit }) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: {
      email: initialValues.email || "",
      password: initialValues.password || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="john@doe.com"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        errorMessage={touched.email && errors.email}
        isRequired
        marginRight={20}
        disabled={isLoading}
      />

      <Field
        label="Password"
        name="password"
        type="password"
        placeholder="********"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        errorMessage={touched.password && errors.password}
        isRequired
        marginRight={20}
        disabled={isLoading}
      />

      <div>
        <Button label="Register" type="submit" isLoading={isLoading} />
        {onLogin && (
          <Button
            label="Already an account? Log in"
            appearance="minimal"
            onClick={onLogin}
            disabled={isLoading}
          />
        )}
      </div>
    </Form>
  );
};

RegisterForm.propTypes = {
  onLogin: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

RegisterForm.defaultProps = {
  initialValues: {},
};

export default RegisterForm;
