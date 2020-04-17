import React, { Component } from "react";
import { connect } from "react-redux";

import AddCustomerFormModal from "../add-customer-form-modal/AddCustomerFormModal";
import Button from "../../ui/button/Button";
import {
  retrieveAll as retrieveAllCustomers,
  create as createCustomer,
} from "../../../store/modules/customer/actions";
import UserCard from "../../user/user-card/UserCard";

import { StyledCustomerContainer } from "./style";

class CustomersContainer extends Component {
  state = { isAddCustomerModalOpen: false };

  componentDidMount() {
    const { customers, getCustomers } = this.props;

    !customers.length && getCustomers();
  }

  toggleAddCustomerModal = () => {
    const { isAddCustomerModalOpen } = this.state;

    this.setState({ isAddCustomerModalOpen: !isAddCustomerModalOpen });
  };

  render() {
    const { customers, isCreateCustomerLoading } = this.props;
    const { isAddCustomerModalOpen } = this.state;

    return (
      <div>
        <AddCustomerFormModal
          onToggle={this.toggleAddCustomerModal}
          isOpen={isAddCustomerModalOpen}
          isLoading={isCreateCustomerLoading}
        />

        <Button
          label="New"
          iconBefore="plus"
          appearance="minimal"
          onClick={this.toggleAddCustomerModal}
        />

        <StyledCustomerContainer>
          {customers.map((customer) => (
            <UserCard
              key={customer._id}
              email={customer.lead.email}
              firstName={customer.lead.firstName}
              lastName={customer.lead.lastName}
            />
          ))}
        </StyledCustomerContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customers: state.customer.list,
  isCreateCustomerLoading: state.customer.actions.create.loading,
  isCreateCustomerSuccess: state.customer.actions.create.success,
  isCreateCustomerError: state.customer.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  createCustomer: (data) => dispatch(createCustomer(data)),
  getCustomers: () => dispatch(retrieveAllCustomers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomersContainer);
