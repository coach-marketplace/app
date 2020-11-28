import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Popover, Position } from 'evergreen-ui'

import AuthMenu from './auth-menu/AuthMenu'
import Avatar from '../../ui/avatar/Avatar'
import Button from '../../ui/button/Button'
import * as actions from '../../../store/modules/auth/actions'
import { User } from '../../../services/domains/User'

// TODO: refactor Popover as a UI component

const Container = styled.div`
  display: flex;
`

const AuthState = ({ user, logout }) => {
  let content

  if (user) {
    content = (
      <Popover
        position={Position.TOP_RIGHT}
        content={() => <AuthMenu logout={logout} />}
      >
        <Button appearance="minimal" height={48} iconAfter="caret-down">
          <Avatar name={user.fullName} src={user.avatar} size={40} />
        </Button>
      </Popover>
    )
  } else {
    content = (
      <>
        <Link to="/login">
          <Button label="Login" appearance="minimal" />
        </Link>
        <Link to="/register">
          <Button label="Register" appearance="minimal" />
        </Link>
      </>
    )
  }

  return <Container className="auth-state">{content}</Container>
}

const mapStateToProps = (state) => {
  return {
    user: new User(state.user.current),
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthState)
