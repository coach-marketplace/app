import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";

import Form from "../../../components/ui/form/Form";
import Field from "../../../components/ui/form/field/Field";
import Button from "../../../components/ui/button/Button";
import validationSchema from "./validation";
import * as actions from "../../../store/modules/customer/actions";

/**
 * See Formik doc:
 * https://jaredpalmer.com/formik/docs/api/formik
 */

class AddCustomerForm extends Component {
  onFormSubmit = formData => {
    this.props.createCustomer(formData);
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

const mapStateToProps = state => ({
  customers: state.customer.list,
  authUser: state.auth.authUser
});

const mapDispatchToProps = dispatch => ({
  createCustomer: data => dispatch(actions.create(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerForm);
