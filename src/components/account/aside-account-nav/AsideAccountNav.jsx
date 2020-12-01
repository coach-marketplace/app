import React from 'react'
import { Link } from 'react-router-dom'

import Pane from '../../ui/pane/Pane'
import Button from '../../ui/button/Button'

import { useSelector } from 'react-redux'

const AsideAccountNav = () => {
  const isCoach = useSelector((state) => state.user.current.isCoach)

  const navigation = [
    { label: 'Profile', path: '/account/profile' },
    { label: 'Metrics', path: '/account/metrics' },
    { label: 'Accounts & Security', path: '/account/account-and-security' },
  ]

  if (isCoach) {
    navigation.push({ label: 'Coach Profile', path: '/account/coach-profile' })
  }

  return (
    <Pane
      width={200}
      display="flex"
      flexDirection="column"
      border="default"
      padding={20}
      alignItems="stretch"
    >
      {navigation.map((item) => (
        <Link to={item.path} key={item.path}>
          <Button label={item.label} appearance="minimal" width="100%" />
        </Link>
      ))}
    </Pane>
  )
}

export default AsideAccountNav
