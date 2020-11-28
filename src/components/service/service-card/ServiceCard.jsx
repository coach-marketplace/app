import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Pane, Text } from '../../ui'

class ServiceCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {}

  render() {
    const { title } = this.props

    return (
      <Pane
        elevation={1}
        display="flex"
        justifyContent="flexStart"
        alignItems="center"
        padding={20}
        marginTop={10}
        background="white"
      >
        <Text>{title}</Text>
      </Pane>
    )
  }
}

export default ServiceCard
