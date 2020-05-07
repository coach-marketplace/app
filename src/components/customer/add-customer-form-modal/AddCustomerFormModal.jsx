import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CustomerForm from "../customer-form/CustomerForm";
import {
  Title,
  Input,
  toaster,
  Label,
  Button,
  Text,
  Pane,
  SideModal,
  Alert,
} from "../../ui";
import CustomerDataPreview from "../customer-data-preview/CustomerDataPreview";
import API from "../../../services/api";
import { COLOR } from "../../../helper/constants";
import { create as createCustomer } from "../../../store/modules/customer/actions";

const AddCustomerFormModal = ({
  isOpen,
  onToggle,
  user,
  createCustomer,
  isCreateCustomerLoading,
  isCreateCustomerSuccess,
  isCreateCustomerError,
}) => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [customerErrorMessage, setCustomerErrorMessage] = useState("");
  const [isEmailButtonLoading, setIsEmailButtonLoading] = useState(false);
  const [fetchedCustomer, setFetchedCustomer] = useState(null);
  const [isCustomerFetched, setIsCustomerFetched] = useState(false);

  useEffect(() => {
    if (!isCreateCustomerLoading && isCreateCustomerSuccess) {
      toaster.success("Customer successfully created");
      setIsCustomerFetched(false);
    }
    if (!isCreateCustomerLoading && isCreateCustomerError) {
      toaster.danger("Error when creating the customer");
    }
  }, [isCreateCustomerError, isCreateCustomerLoading, isCreateCustomerSuccess]);

  const fetchUserByEmail = async () => {
    setIsEmailButtonLoading(true);

    if (!customerEmail) {
      setEmailErrorMessage("Email is required");
      setIsEmailButtonLoading(false);
      return;
    }

    const fetchedCustomer = await API.get(
      `coach/${user._id}/search-users`,
      {},
      { email: customerEmail }
    );

    if (!fetchedCustomer.data) {
      setCustomerErrorMessage(
        "This email is not in the database, you have to create it manually."
      );
    } else {
      setCustomerErrorMessage("");
    }

    setFetchedCustomer(fetchedCustomer.data);
    setIsCustomerFetched(true);
    setIsEmailButtonLoading(false);
  };

  const addAsCustomer = (data) => {
    createCustomer(data);
  };

  return (
    <SideModal isShown={isOpen} onCloseComplete={onToggle}>
      <Title marginBottom={20}>Add an customer</Title>
      <Pane display="flex" flexDirection="column" alignItems="flex-start">
        <Label htmlFor="add-customer-email" marginBottom={10} display="block">
          Enter the email of your customer
        </Label>
        <Input
          id="add-customer-email"
          value={customerEmail}
          type="email"
          placeholder="John@email.com"
          onChange={(event) => setCustomerEmail(event.target.value)}
        />

        {emailErrorMessage && (
          <Text color={COLOR.DANGER} display="block" size={300}>
            {emailErrorMessage}
          </Text>
        )}
        <Button
          onClick={fetchUserByEmail}
          marginTop={20}
          isLoading={isEmailButtonLoading}
        >
          Next
        </Button>
      </Pane>
      {isCustomerFetched && customerErrorMessage && (
        <>
          <Alert
            intent="none"
            title={customerErrorMessage}
            marginTop={20}
            marginBottom={20}
          />
          <CustomerForm
            initialValues={{
              email: customerEmail,
            }}
            onSubmit={createCustomer}
          />
        </>
      )}
      {fetchedCustomer && !customerErrorMessage && (
        <>
          <CustomerDataPreview customer={fetchedCustomer} />
          <Button
            onClick={() => addAsCustomer({ customerId: fetchedCustomer._id })}
          >
            Add
          </Button>
        </>
      )}
    </SideModal>
  );
};

AddCustomerFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.current,
  isCreateCustomerLoading: state.customer.actions.create.loading,
  isCreateCustomerSuccess: state.customer.actions.create.success,
  isCreateCustomerError: state.customer.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  createCustomer: (data) => dispatch(createCustomer(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomerFormModal);
