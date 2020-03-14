import React, { Component } from "react";
import { Formik } from "formik";

import Form from "../../../components/ui/form/Form";
import Field from "../../../components/ui/form/field/Field";
import Button from "../../../components/ui/button/Button";
import validationSchema from "./validation";

class AddCustomerForm extends Component {
  static displayName = "AddCustomerForm";

  state = {
    customers: {}
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, a) => {
            console.log(JSON.stringify(values));
            console.log("a", a);
          }}
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
