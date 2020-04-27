import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { StyledCustomerContainer } from "./style";
import AddCustomerFormModal from "../add-customer-form-modal/AddCustomerFormModal";
import Button from "../../ui/button/Button";
import UserCard from "../../user/user-card/UserCard";
import toaster from "../../ui/toaster/toaster";
import {
  retrieveAll as retrieveAllCustomers,
  create as createCustomer,
} from "../../../store/modules/customer/actions";
import {
  create as createConversation,
  resetCreateAction as resetCreateConversationStoreAction,
} from "../../../store/modules/conversation/actions";

const CustomersContainer = ({
  customers,
  getCustomers,
  isCreateCustomerLoading,
  isCreateConversationLoading,
  isCreateConversationError,
  isCreateConversationSuccess,
  createConversation,
  conversationJustCreated,
  resetCreateConversationStoreAction,
  history,
}) => {
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);

  useEffect(() => {
    !customers.length && getCustomers();
  }, [customers.length, getCustomers]);

  useEffect(() => {
    if (
      !isCreateConversationLoading &&
      isCreateConversationSuccess &&
      conversationJustCreated
    ) {
      history.push(`/conversation/${conversationJustCreated}`);
      /**
       * We need to clean the store else the next time we come back here the
       * value will be the same et we will be redirect to conversation again.
       */
      resetCreateConversationStoreAction();
    } else if (!isCreateConversationLoading && isCreateConversationError) {
      toaster.danger("Error to contact this customer");
    }
  }, [
    conversationJustCreated,
    history,
    isCreateConversationError,
    isCreateConversationLoading,
    isCreateConversationSuccess,
    resetCreateConversationStoreAction,
  ]);

  return (
    <div>
      <AddCustomerFormModal
        onToggle={() => setIsAddCustomerModalOpen(!isAddCustomerModalOpen)}
        isOpen={isAddCustomerModalOpen}
        isLoading={isCreateCustomerLoading}
      />

      <Button
        label="New"
        iconBefore="plus"
        appearance="minimal"
        onClick={() => setIsAddCustomerModalOpen(!isAddCustomerModalOpen)}
      />

      <StyledCustomerContainer>
        {customers.map((customer) => (
          <UserCard
            key={customer._id}
            email={customer.lead.email}
            firstName={customer.lead.firstName}
            lastName={customer.lead.lastName}
            onMessageClick={() => {
              createConversation(customer.lead._id);
            }}
          />
        ))}
      </StyledCustomerContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customers: state.customer.list,
  isCreateCustomerLoading: state.customer.actions.create.loading,
  isCreateConversationLoading: state.conversation.actions.create.loading,
  isCreateConversationError: state.conversation.actions.create.error,
  isCreateConversationSuccess: state.conversation.actions.create.success,
  conversationJustCreated: state.conversation.actions.create.data,
});

const mapDispatchToProps = (dispatch) => ({
  createCustomer: (data) => dispatch(createCustomer(data)),
  getCustomers: () => dispatch(retrieveAllCustomers()),
  // Don't forget to pass a array containing the participants ids
  createConversation: (userId) => dispatch(createConversation([userId])),
  resetCreateConversationStoreAction: () =>
    dispatch(resetCreateConversationStoreAction()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomersContainer)
);
