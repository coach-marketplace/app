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
  static displayName = "AddCustomerForm";

  // state = {
  //   customers: {}
  // };

  constructor(props) {
    super(props);
    console.log(props);
  }

  onFormSubmit = formData => {
    console.log("data", formData);
    this.props.createCustomer();
  };

  render() {
    return (
      <div>
        {this.props.customers.length &&
          this.props.customers.map(cus => {
            console.log("++", cus);
            return <p>{cus.name}</p>;
          })}
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

// export default AddCustomerForm;

const mapStateToProps = state => {
  return {
    customers: state.customer.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCustomer: () => dispatch(actions.create())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerForm);
