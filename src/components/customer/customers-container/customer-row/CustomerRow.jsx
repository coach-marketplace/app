import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  UserRow,
  CellCustomer,
  CellEmail,
  CellActions,
  CustomerInfoWrapper,
} from './style'
import { Avatar, Button } from '../../../ui'
import { User } from '../../../../services/domains/User'

const UserRowComponent = ({ userData, onManageClick, onMessageClick }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    userData && setUser(new User(userData))
  }, [userData])

  return (
    <UserRow>
      <CellCustomer>
        <Avatar name={user.fullName} src={user.avatar} />
        <CustomerInfoWrapper>
          <span className="full-name">{user.fullName}</span>
          <span className="date">{user.subscriptionDate}</span>
        </CustomerInfoWrapper>
      </CellCustomer>
      <CellEmail>{user.email}</CellEmail>
      <CellActions>
        <Button onClick={onMessageClick} appearance="minimal">
          chat
        </Button>
        <Button onClick={onManageClick} appearance="minimal">
          manage
        </Button>
      </CellActions>
    </UserRow>
  )
}

UserRowComponent.propTypes = {
  userData: PropTypes.object.isRequired,
  onManageClick: PropTypes.func,
  onMessageClick: PropTypes.func,
}

export default UserRowComponent
