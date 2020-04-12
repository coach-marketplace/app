import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CustomerForm from "../customer-form/CustomerForm";
import SideModal from "../../ui/modal/SideModal";
import Title from "../../ui/typography/Title";
import toaster from "../../ui/toaster/toaster";
import { create as createCustomer } from "../../../store/modules/customer/actions";

class AddCustomerFormModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  state = {};

  static getDerivedStateFromProps(props, state) {
    const {
      isCreateCustomerError,
      isCreateCustomerLoading,
      isCreateCustomerSuccess,
    } = props;

    if (!isCreateCustomerLoading && isCreateCustomerSuccess) {
      toaster.success("Customer successfully created");
      // TODO: reset and close the form modal
    } else if (!isCreateCustomerLoading && isCreateCustomerError) {
      toaster.danger("Error when creating the customer");
    }

    return state;
  }

  onCustomerSubmitted = (data) => {
    const { createCustomer } = this.props;

    createCustomer(data);
  };

  render() {
    const { isOpen, onToggle } = this.props;

    return (
      <SideModal isShown={isOpen} onCloseComplete={onToggle}>
        <Title>Add an customer</Title>
        <CustomerForm onSubmit={this.onCustomerSubmitted} />
      </SideModal>
    );
  }
}

const mapStateToProps = (state) => ({
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
