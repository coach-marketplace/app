import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, SearchInput } from 'evergreen-ui'

import { StyledTextarea } from './style'

const Input = ({ type, placeholder, ...props }) => {
  if (['text', 'email', 'password', 'number'].includes(type)) {
    return <TextInput placeholder={placeholder} {...props} type={type} />
  } else if (['search'].includes(type)) {
    return <SearchInput placeholder={placeholder} {...props} />
  } else if (['textarea'].includes(type)) {
    return <StyledTextarea placeholder={placeholder} {...props} />
  }
}

Input.displayName = 'Input'

Input.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'textarea',
    'password',
    'number',
    'search',
  ]),
}

Input.defaultProps = {
  type: 'text',
}

export default Input
