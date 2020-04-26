import React from "react";
import PropTypes from "prop-types";

import { Text, Pane } from "../../ui";

/**
 * Component returning a quick preview about a user data
 *
 * @component
 * @param {object} props
 * @param {object} props.customer Customer data object
 * * @example
 * const customer = {
 *    firstName: "John",
 *    lastName: "Doe",
 *    email: "joh.doe_email.com",
 * }
 *
 * return (
 *   <CustomerDataPreview age={customer} />
 * )
 */
const CustomerDataPreview = ({ customer }) => {
  return (
    <Pane marginTop={50}>
      <Pane display="flex" justifyContent="space-between">
        <Pane
          display="flex"
          flexDirection="column"
          marginTop={10}
          marginBottom={10}
          width="50%"
        >
          <Text size={300}>First name</Text>
          <Text>{customer.firstName}</Text>
        </Pane>
        <Pane
          display="flex"
          flexDirection="column"
          marginTop={10}
          marginBottom={10}
          width="50%"
        >
          <Text size={300}>Last name</Text>
          <Text>{customer.lastName}</Text>
        </Pane>
      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        marginTop={10}
        marginBottom={10}
      >
        <Text size={300}>Email</Text>
        <Text>{customer.email}</Text>
      </Pane>
    </Pane>
  );
};

CustomerDataPreview.propTypes = {
  customer: PropTypes.shape({
    firstName: PropTypes.string,
  }),
};

export default CustomerDataPreview;
