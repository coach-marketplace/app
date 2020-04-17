import React, { Component } from "react";
import { Formik } from "formik";

import Form from "../../ui/form/Form";
import Field from "../../ui/form/field/Field";
import Button from "../../ui/button/Button";
import validationSchema from "./validation";

/**
 * See Formik doc:
 * https://jaredpalmer.com/formik/docs/api/formik
 */

class AddCustomerForm extends Component {
  onFormSubmit = (formData) => {
    const { onSubmit } = this.props;
    onSubmit(formData);
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={this.onFormSubmit}
        >
          <Form>
            <Field
              label="First Name"
              name="firstName"
              type="text"
              placeholder="John"
            />
            <Field
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Doe"
            />
            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@doe.com"
            />
            <Field
              label="Phone number"
              name="phone"
              type="text"
              placeholder="+32 476 64 66 71"
            />
            <Button type="submit">Create</Button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default AddCustomerForm;
