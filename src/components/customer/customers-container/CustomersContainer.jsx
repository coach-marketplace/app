import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { CustomersContainer, ToolBar } from './style'
import UserRow from './customer-row'
import ContainerHeader from './container-header'
import AddCustomerFormModal from '../add-customer-form-modal/AddCustomerFormModal'
import { Button, toaster, Input } from '../../ui'
import {
  retrieveAll as retrieveAllCustomers,
  create as createCustomer,
} from '../../../store/modules/customer/actions'
import {
  create as createConversation,
  resetCreateAction as resetCreateConversationStoreAction,
} from '../../../store/modules/conversation/actions'

const CustomersContainerComponent = ({
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
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    !customers.length && getCustomers()
  }, [customers.length, getCustomers])

  useEffect(() => {
    if (
      !isCreateConversationLoading &&
      isCreateConversationSuccess &&
      conversationJustCreated
    ) {
      history.push(`/conversation/${conversationJustCreated}`)
      /**
       * We need to clean the store else the next time we come back here the
       * value will be the same et we will be redirect to conversation again.
       */
      resetCreateConversationStoreAction()
    } else if (!isCreateConversationLoading && isCreateConversationError) {
      toaster.danger('Error to contact this customer')
    }
  }, [
    conversationJustCreated,
    history,
    isCreateConversationError,
    isCreateConversationLoading,
    isCreateConversationSuccess,
    resetCreateConversationStoreAction,
  ])

  return (
    <div>
      <AddCustomerFormModal
        onToggle={() => setIsAddCustomerModalOpen(!isAddCustomerModalOpen)}
        isOpen={isAddCustomerModalOpen}
        isLoading={isCreateCustomerLoading}
      />

      <ToolBar>
        <Input
          type="search"
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
        />
        <Button
          label="New"
          iconBefore="plus"
          appearance="primary"
          onClick={() => setIsAddCustomerModalOpen(!isAddCustomerModalOpen)}
        />
      </ToolBar>

      <CustomersContainer>
        <ContainerHeader />
        {customers.map((customer) => (
          <UserRow
            key={customer._id}
            userData={customer.lead}
            onMessageClick={() => createConversation(customer.lead._id)}
          />
        ))}
      </CustomersContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  customers: state.customer.list,
  isCreateCustomerLoading: state.customer.actions.create.loading,
  isCreateConversationLoading: state.conversation.actions.create.loading,
  isCreateConversationError: state.conversation.actions.create.error,
  isCreateConversationSuccess: state.conversation.actions.create.success,
  conversationJustCreated: state.conversation.actions.create.data,
})

const mapDispatchToProps = (dispatch) => ({
  createCustomer: (data) => dispatch(createCustomer(data)),
  getCustomers: () => dispatch(retrieveAllCustomers()),
  // Don't forget to pass a array containing the participants ids
  createConversation: (userId) => dispatch(createConversation([userId])),
  resetCreateConversationStoreAction: () =>
    dispatch(resetCreateConversationStoreAction()),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomersContainerComponent),
)
